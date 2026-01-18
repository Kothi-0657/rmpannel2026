// src/services/googleSheetAPI.ts
export const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxSsisOPDCx9zrTAZrWE4e6ZlgcLYnrHLbtTYBsTLC_8W1DBIPSVMhUwxIhgE8nOSRMCQ/exec";

// Fetch all customers
export const fetchCustomers = async () => {
  const res = await fetch(SCRIPT_URL);
  if (!res.ok) throw new Error("Failed to fetch customers");
  const data = await res.json();
  return data; // return array directly
};


// Update customer data
export const updateCustomer = async (payload: {
  id: string;
  status: string;
  followUpDate?: string;
  notes?: string;
}) => {
  const res = await fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "updateCustomer",
      ...payload,
    }),
  });
  const data = await res.json();
  return data;
};

