import React from "react";
import { maskPhoneNumber } from "../utils/mask";
interface Props {
  customers: any[];
  onSelect: (customer: any) => void;
}

// Format date → 18 January 2026
const formatDate = (value: string) => {
  if (!value) return "-";
  const d = new Date(value);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};


const CustomerTable: React.FC<Props> = ({ customers, onSelect }) => {
  return (
    <div style={styles.wrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Phone</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Last call</th>
            <th style={styles.th}>Follow-up</th>
            <th style={styles.th}>Notes</th>
            <th style={{ ...styles.th, minWidth: 120, textAlign: "center" }}>
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr key={c.customerId ?? c.id} style={styles.tr}>
              <td style={styles.td}>{c.name}</td>
              <td style={styles.td}>{maskPhoneNumber(c.phone)}</td> {/* masked */}
              <td style={styles.td}>{c.status}</td>
              <td style={styles.td}>{c.subStatus}</td>
              <td style={styles.td}>{formatDate(c.followUpDate)}</td>
              <td style={styles.notesTd}>{c.notes || "-"}</td>
              <td style={{ ...styles.td, textAlign: "center" }}>
                <button
                  style={styles.viewBtn}
                  onClick={() => onSelect(c)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;

/* ======================
   STYLES (NO TAILWIND)
   ====================== */

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    backgroundColor: "#1f2937",
    borderRadius: 14,
    overflowX: "auto",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    color: "#ffffff",
  },
  th: {
    padding: "14px 16px",
    backgroundColor: "#374151",
    textAlign: "left",
    fontWeight: 600,
    fontSize: 14,
    whiteSpace: "nowrap",
  },
  tr: {
    borderBottom: "1px solid #374151",
  },
  td: {
    padding: "12px 16px",
    fontSize: 14,
    whiteSpace: "nowrap",
    verticalAlign: "top",
  },
  notesTd: {
    padding: "12px 16px",
    fontSize: 14,
    whiteSpace: "normal",   // ✅ allow wrapping
    maxWidth: 300,
    lineHeight: 1.4,
    color: "#e5e7eb",
  },
  viewBtn: {
    backgroundColor: "#22c55e",
    color: "#000",
    border: "none",
    padding: "8px 18px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
};
