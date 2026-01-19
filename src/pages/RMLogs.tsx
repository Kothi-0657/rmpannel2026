import React, { useEffect, useState } from "react";
import { fetchRMDailyLogs } from "../services/rmLogs";

interface RMLogsProps {
  rmEmail: string;
}

/* =========================
   FORMAT HELPERS
   ========================= */

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

// Format time → 06:12:59
const formatTime = (value: string) => {
  if (!value) return "-";
  const d = new Date(value);
  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};

const RMLogs: React.FC<RMLogsProps> = ({ rmEmail }) => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRMDailyLogs(rmEmail)
      .then((data) => {
        setLogs(data || []);
      })
      .finally(() => setLoading(false));
  }, [rmEmail]);

  if (loading) {
    return (
      <div style={{ padding: 24, color: "#ffffff" }}>
        Loading RM logs...
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ color: "#ffffff", marginBottom: 16 }}>
        My Daily Logs
      </h2>

      <table
        style={{
          width: "100%",
          color: "#ffffff",
          borderCollapse: "collapse",
          backgroundColor: "#1f2937",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Login Time</th>
            <th style={thStyle}>Logout Time</th>
          </tr>
        </thead>

        <tbody>
          {logs.length === 0 && (
            <tr>
              <td colSpan={3} style={emptyStyle}>
                No logs found
              </td>
            </tr>
          )}

          {logs.map((log, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #374151" }}>
              {/* Sheet structure:
                  log[0] → Date
                  log[1] → RM Email
                  log[2] → Login Time
                  log[3] → Logout Time
              */}
              <td style={tdStyle}>{formatDate(log[0])}</td>
              <td style={tdStyle}>{formatTime(log[2])}</td>
              <td style={tdStyle}>
                {log[3] ? formatTime(log[3]) : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* =========================
   STYLES
   ========================= */

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "10px 12px",
  borderBottom: "2px solid #4b5563",
  fontWeight: 600,
};

const tdStyle: React.CSSProperties = {
  padding: "10px 12px",
  fontSize: 14,
};

const emptyStyle: React.CSSProperties = {
  padding: 16,
  textAlign: "center",
  color: "#9ca3af",
};

export default RMLogs;
