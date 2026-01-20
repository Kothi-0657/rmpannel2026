import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { fetchCustomers } from "../services/googleSheet";

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  followUpDate?: string;
  notes?: string;
  rmEmail?: string;
}

interface RMContextType {
  rmEmail: string;
  customers: Customer[];
  reloadCustomers: () => void;
}

const RMContext = createContext<RMContextType | null>(null);

interface RMProviderProps {
  children: ReactNode;
  rmEmail: string; // email of logged-in RM
}

export const RMProvider: React.FC<RMProviderProps> = ({ children, rmEmail }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const loadCustomers = async () => {
    try {
      const data = await fetchCustomers(); // fetch all from sheet
      // Filter by RM email
      const filtered = data.filter((c: Customer) => c.rmEmail === rmEmail);
      setCustomers(filtered);
    } catch (err) {
      console.error("Failed to load customers:", err);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [rmEmail]);

  return (
    <RMContext.Provider
      value={{
        rmEmail,
        customers,
        reloadCustomers: loadCustomers,
      }}
    >
      {children}
    </RMContext.Provider>
  );
};

export const useRM = () => {
  const context = useContext(RMContext);
  if (!context) {
    throw new Error("useRM must be used inside RMProvider");
  }
  return context;
};
