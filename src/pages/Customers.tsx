import React from "react";
import { useRM } from "../context/RMContext";
import CustomerDrawer from "../components/CustomerDrawer";

const Customers = () => {
  const { customers, reloadCustomers } = useRM();
  const [selected, setSelected] = React.useState<any>(null);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Customers</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 bg-opacity-30 backdrop-blur-md rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-gray-700 bg-opacity-50 text-left">
              {["Name", "Phone", "Email", "Status", "Follow-up"].map((h) => (
                <th key={h} className="px-6 py-3 text-white">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr
                key={c.id}
                className="hover:bg-gray-700 hover:bg-opacity-40 cursor-pointer transition"
                onClick={() => setSelected(c)}
              >
                <td className="px-6 py-3">{c.name}</td>
                <td className="px-6 py-3">{c.phone}</td>
                <td className="px-6 py-3">{c.email}</td>
                <td className="px-6 py-3">{c.status}</td>
                <td className="px-6 py-3">{c.followUpDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
