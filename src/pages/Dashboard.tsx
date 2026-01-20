import React, { useMemo, useState, useEffect } from "react";
import { useRM } from "../context/RMContext";
import { fetchRMDailyLogs } from "../services/rmLogs";
import { maskPhoneNumber } from "../utils/mask";
/* =========================
   HELPER FUNCTIONS
   ========================= */
const isSameDay = (dateStr1: string, dateStr2: string) => {
  const d1 = new Date(dateStr1);
  const d2 = new Date(dateStr2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

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

/* =========================
   MAIN DASHBOARD
   ========================= */
const Dashboard: React.FC<{ rmName: string }> = ({ rmName }) => {
  const { customers } = useRM();
  const [logs, setLogs] = useState<any[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<any[]>([]);
  const [modalTitle, setModalTitle] = useState("");

  const todayStr = new Date().toISOString().slice(0, 10);

  /* =========================
     SUMMARY CALCULATIONS
     ========================= */
  const summary = useMemo(() => {
    let totalCustomers = customers.length;
    let followUpsToday = 0;
    let inspectionsDone = 0;
    let salesFollowUpsToday = 0;
    const todayCustomers: any[] = [];

    customers.forEach((c) => {
      if (c.followUpDate && isSameDay(c.followUpDate, todayStr)) {
        followUpsToday++;
        todayCustomers.push(c);
      }
      if (c.status === "inspection_done") inspectionsDone++;
      if (c.status === "sale_followup" && c.followUpDate && isSameDay(c.followUpDate, todayStr)) {
        salesFollowUpsToday++;
        todayCustomers.push(c);
      }
    });

    return { totalCustomers, followUpsToday, inspectionsDone, salesFollowUpsToday, todayCustomers };
  }, [customers, todayStr]);

  /* =========================
     LOAD ATTENDANCE LOGS
     ========================= */
  useEffect(() => {
    if (customers?.length > 0) {
      fetchRMDailyLogs(customers[0].rmEmail || "").then((data) => {
        setLogs(data || []);
      });
    }
  }, [customers]);

  /* =========================
     ATTENDANCE CALCULATIONS
     ========================= */
  const attendanceByDay = useMemo(() => {
    const grouped: Record<string, { loginTimes: Date[]; logoutTimes: Date[] }> = {};

    logs.forEach((l) => {
      const dateStr = l[0]?.slice(0, 10);
      if (!dateStr) return;

      if (!grouped[dateStr]) grouped[dateStr] = { loginTimes: [], logoutTimes: [] };

      if (l[2]) grouped[dateStr].loginTimes.push(new Date(l[2]));
      if (l[3]) grouped[dateStr].logoutTimes.push(new Date(l[3]));
    });

    const result: { date: string; login: string; logout: string; hours: string }[] = [];

    Object.keys(grouped)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      .forEach((date) => {
        const { loginTimes, logoutTimes } = grouped[date];
        const firstLogin = loginTimes[0] || null;
        const lastLogout = logoutTimes[logoutTimes.length - 1] || null;

        let hours = "-";
        if (firstLogin && lastLogout) {
          hours = ((lastLogout.getTime() - firstLogin.getTime()) / (1000 * 60 * 60)).toFixed(2) + " hrs";
        }

        result.push({
          date,
          login: firstLogin ? formatTime(firstLogin.toISOString()) : "-",
          logout: lastLogout ? formatTime(lastLogout.toISOString()) : "-",
          hours,
        });
      });

    return result;
  }, [logs]);

  const todayLog = attendanceByDay.find((a) => a.date === todayStr)?.hours || "-";
  const last15Days = attendanceByDay.slice(0, 15);

  /* =========================
     SUMMARY CARDS CLICK HANDLER
     ========================= */
  const handleCardClick = (title: string) => {
    if (title === "Follow Ups Today") {
      setSelectedCustomers(summary.todayCustomers);
      setModalTitle(title);
    }
  };

  /* =========================
     RENDER
     ========================= */
  return (
    <div style={styles.container}>
      {/* SUMMARY GRID */}
      <div style={styles.summaryGrid}>
        <SummaryCard title="Total Customers" value={summary.totalCustomers} />
        <SummaryCard
          title="Follow Ups Today"
          value={summary.followUpsToday}
          onClick={() => handleCardClick("Follow Ups Today")}
        />
        <SummaryCard title="Inspections Done" value={summary.inspectionsDone} />
        <SummaryCard title="Sales Follow Ups Today" value={summary.salesFollowUpsToday} />
      </div>

      {/* ATTENDANCE SECTION */}
      <div style={styles.attendanceSection}>
        <h3 style={{ marginBottom: 12 }}>Attendance</h3>
        <div style={styles.attendanceRow}>
          <div style={styles.attendanceCard}>
            <div style={styles.attendanceValue}>{todayLog}</div>
            <div style={styles.attendanceTitle}>Today Login Hours</div>
          </div>
        </div>

        <h4 style={{ marginTop: 20 }}>Last 15 Days</h4>
        <table style={styles.attendanceTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Login</th>
              <th>Logout</th>
              <th>Hours</th>
            </tr>
          </thead>
          <tbody>
            {last15Days.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: 8 }}>No logs found</td>
              </tr>
            )}
            {last15Days.map((l, idx) => (
              <tr key={idx}>
                <td>{formatDate(l.date)}</td>
                <td>{l.login}</td>
                <td>{l.logout}</td>
                <td>{l.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CUSTOMER DETAILS MODAL */}
      {selectedCustomers.length > 0 && (
        <div style={styles.modalOverlay} onClick={() => setSelectedCustomers([])}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h4>{modalTitle}</h4>
            <table style={{ width: "100%", marginTop: 12 }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Follow-Up Date</th>
                </tr>
              </thead>
              <tbody>
                {selectedCustomers.map((c, idx) => (
                  <tr key={idx}>
                    <td>{c.name}</td>
                    <td>{maskPhoneNumber(c.phone)}</td>
                    <td>{c.status}</td>
                    <td>{c.followUpDate ? formatDate(c.followUpDate) : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

/* =========================
   SUMMARY CARD COMPONENT
   ========================= */
const SummaryCard: React.FC<{ title: string; value: number; onClick?: () => void }> = ({
  title,
  value,
  onClick,
}) => (
  <div style={styles.summaryCard} onClick={onClick}>
    <div style={styles.summaryValue}>{value}</div>
    <div style={styles.summaryTitle}>{title}</div>
  </div>
);

/* =========================
   STYLES
   ========================= */
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: 24,
    minHeight: "100vh",
    backgroundColor: "#111827",
    color: "#fff",
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 16,
    marginBottom: 32,
  },
  summaryCard: {
    padding: 20,
    borderRadius: 16,
    textAlign: "center",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
    cursor: "pointer",
  },
  summaryValue: {
    fontSize: 26,
    fontWeight: 600,
    textAlign: "center",
  },
  summaryTitle: {
    fontSize: 13,
    color: "#9ca3af",
  },
  attendanceSection: {
    marginTop: 40,
    padding: 20,
    background: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    backdropFilter: "blur(10px)",
  },
  attendanceRow: {
    display: "flex",
    gap: 16,
  },
  attendanceCard: {
    padding: 16,
    borderRadius: 12,
    background: "rgba(255,255,255,0.08)",
    textAlign: "center",
    flex: 1,
  
  },
  attendanceValue: {
    fontSize: 22,
    fontWeight: 600,
    textAlign: "center",
  },
  attendanceTitle: {
    fontSize: 12,
    color: "#ccc",
    textAlign: "center",
  },
  attendanceTable: {
    width: "100%",
    marginTop: 22,
    borderCollapse: "collapse",
    textAlign: "center",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    width: "80%",
    maxHeight: "70vh",
    overflowY: "auto",
    background: "#1f2937",
    padding: 20,
    borderRadius: 16,
    textAlign: "center",
  },
};
