import { useState } from "react";
import { updateCustomer } from "../services/googleSheet";

const CustomerDrawer = ({ customer, onClose }: any) => {
  const [status, setStatus] = useState(customer.status || "Fresh");
  const [followUpDate, setFollowUpDate] = useState(customer.followUpDate || "");
  const [notes, setNotes] = useState(customer.notes || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateCustomer({ id: customer.id, status, followUpDate, notes });
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 bg-opacity-30 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96">
        <h3 className="text-2xl font-bold mb-4">{customer.name}</h3>

        <label>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 mb-4 rounded-xl bg-gray-700 bg-opacity-50 text-white"
        >
          {["Fresh","Inspection Scheduled","Inspections Done","Inspection Call back","Inspection Follow Up","Inspection Future hold","Inspection Not Required now","Inspection Rejected","Report Waiting for raw report","Report under Creation","Report shared to CX","Sale Call back","Sale Follow Up","Sale Future hold","Sale Not Required now","Sale Rejected","Sales Converted","Full Payment done","1st installment paid","2nd installment paid","3rd installment paid","Final Installment paid"].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <label>Follow-up Date</label>
        <input
          type="date"
          value={followUpDate}
          onChange={(e) => setFollowUpDate(e.target.value)}
          className="w-full p-2 mb-4 rounded-xl bg-gray-700 bg-opacity-50 text-white"
        />

        <label>Notes</label>
        <textarea
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 mb-4 rounded-xl bg-gray-700 bg-opacity-50 text-white"
        />

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-gray-600 hover:bg-gray-500">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500">{loading ? "Saving..." : "Save"}</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDrawer;
