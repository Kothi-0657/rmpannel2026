import { useState } from "react";
import { updateCustomer } from "../services/googleSheet";
import { maskPhoneNumber } from "../utils/mask";

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

  // Actions
  const handleCall = () => alert(`Call ${customer.phone}`);
  const handleWhatsApp = () => alert(`WhatsApp ${customer.phone}`);
  const handleMail = () => window.location.href = `mailto:${customer.email}`;

  return (
    <div style={styles.overlay}>
      <div style={styles.drawer}>
        <h3 style={styles.title}>{customer.name}</h3>

        {/* Masked phone */}
        <p style={{ marginBottom: 10 }}>
          Phone: <strong>{maskPhoneNumber(customer.phone)}</strong>
        </p>

        <label style={styles.label}>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={styles.input}
        >
          {[
            "Fresh",
            "Inspection Scheduled",
            "Inspections Done",
            "Inspection Call back",
            "Inspection Follow Up",
            "Inspection Future hold",
            "Inspection Not Required now",
            "Inspection Rejected",
            "Report Waiting for raw report",
            "Report under Creation",
            "Report shared to CX",
            "Sale Call back",
            "Sale Follow Up",
            "Sale Future hold",
            "Sale Not Required now",
            "Sale Rejected",
            "Sales Converted",
            "Full Payment done",
            "1st installment paid",
            "2nd installment paid",
            "3rd installment paid",
            "Final Installment paid",
          ].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <label style={styles.label}>Follow-up Date</label>
        <input
          type="date"
          value={followUpDate}
          onChange={(e) => setFollowUpDate(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Notes</label>
        <textarea
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{ ...styles.input, resize: "none" }}
        />

        {/* Action buttons: Call / WhatsApp / Mail */}
        <div style={styles.buttonRow}>
          <button style={styles.callBtn} onClick={handleCall}>Call</button>
          <button style={styles.whatsappBtn} onClick={handleWhatsApp}>WhatsApp</button>
          <button style={styles.mailBtn} onClick={handleMail}>Mail</button>
        </div>

        <div style={styles.actions}>
          <button style={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button style={styles.saveBtn} onClick={handleSave}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDrawer;

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },
  drawer: {
    width: 520, // slightly larger box
    backgroundColor: "#1f2937",
    padding: 28,
    borderRadius: 14,
    color: "#ffffff",
    boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
  },
  title: {
    fontSize: 22,
    fontWeight: 600,
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    marginBottom: 4,
    display: "block",
  },
  input: {
    width: "100%",
    padding: "8px 10px",
    marginBottom: 14,
    borderRadius: 6,
    border: "1px solid #374151",
    backgroundColor: "#374151",
    color: "#ffffff",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 14,
    gap: 6,
  },
  callBtn: {
    flex: 1,
    fontSize: 16,
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
  whatsappBtn: {
    flex: 1,
    fontSize: 16,
    backgroundColor: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "10px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
  mailBtn: {
    flex: 1,
    fontSize: 16,
    backgroundColor: "#ea7814ff",
    color: "#000",
    border: "none",
    padding: "10px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 12,
  },
  cancelBtn: {
    backgroundColor: "#4b5563",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: 6,
    cursor: "pointer",
  },
  saveBtn: {
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: 6,
    cursor: "pointer",
  },
};
