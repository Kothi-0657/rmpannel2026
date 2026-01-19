import React, { useState } from "react";
import { useRM } from "../context/RMContext";
import CustomerTable from "../components/CustomerTable";
import CustomerDrawer from "../components/CustomerDrawer";

const Customers: React.FC = () => {
  const { customers, reloadCustomers } = useRM();
  const [selected, setSelected] = useState<any>(null);

  return (
    <div style={{ padding: 24 }}>
      <h2 style={styles.heading}>Customers</h2>

      <CustomerTable
        customers={customers}
        onSelect={(customer) => setSelected(customer)}
      />

      {selected && (
        <CustomerDrawer
          customer={selected}
          onClose={() => {
            setSelected(null);
            reloadCustomers();
          }}
        />
      )}
    </div>
  );
};

export default Customers;

/* ======================
   STYLES
   ====================== */

const styles: { [key: string]: React.CSSProperties } = {
  heading: {
    fontSize: 28,
    fontWeight: 600,
    marginBottom: 20,
    color: "#ffffff",
  },
};
