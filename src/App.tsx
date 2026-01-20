import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import RMLogs from "./pages/RMLogs"; // NEW: RM logs page
import { RMProvider } from "./context/RMContext";
import { useState, useEffect } from "react";
import logo from "./assets/logoa1.png";
import { appendRMDailyLog } from "./services/rmLogs";

function App() {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // LOGIN: Check localStorage for RM
  useEffect(() => {
    const storedEmail = localStorage.getItem("rmEmail");
    if (storedEmail) {
      setUser(storedEmail);

      const now = new Date();
      appendRMDailyLog({
        rmEmail: storedEmail,
        date: now.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
        loginTime: now.toLocaleTimeString("en-GB", { hour12: false }),
      });
    }
    setLoading(false);
  }, []);

  // AUTO LOGOUT after 10 min inactivity
    useEffect(() => {
      if (!user) return;
      let timeout: ReturnType<typeof setTimeout>;
  
      const resetTimer = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        const now = new Date();
        appendRMDailyLog({
          rmEmail: user,
          date: now.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
          logoutTime: now.toLocaleTimeString("en-GB", { hour12: false }),
        });
        localStorage.removeItem("rmEmail");
        setUser(null);
        alert("Logged out due to inactivity");
      }, 10 * 60 * 1000);
    };

    ["mousemove", "keydown", "click", "touchstart"].forEach((e) =>
      window.addEventListener(e, resetTimer)
    );
    resetTimer();

    return () => {
      clearTimeout(timeout);
      ["mousemove", "keydown", "click", "touchstart"].forEach((e) =>
        window.removeEventListener(e, resetTimer)
      );
    };
  }, [user]);

  if (loading)
    return <div style={{ padding: 20, fontSize: 18, color: "#ffffff" }}>Loading...</div>;

  if (!user)
    return (
      <Login
        onLogin={(email) => {
          localStorage.setItem("rmEmail", email);
          setUser(email);

          const now = new Date();
          appendRMDailyLog({
            rmEmail: email,
            date: now.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
            loginTime: now.toLocaleTimeString("en-GB", { hour12: false }),
          });
        }}
      />
    );

  const handleLogout = () => {
    if (!user) return;
    const now = new Date();
    appendRMDailyLog({
      rmEmail: user,
      date: now.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
      logoutTime: now.toLocaleTimeString("en-GB", { hour12: false }),
    });
    localStorage.removeItem("rmEmail");
    setUser(null);
  };

  return (
    <RMProvider rmEmail={user}>
      <Router>
        <div style={styles.container}>
          <DashboardHeader rmName={user} onLogout={handleLogout} />

          {/* NAV LINKS */}
          <div style={styles.navLinks}>
            <Link to="/" style={styles.navLink}>
              Dashboard
            </Link>

            <Link to="/customers" style={styles.navLink}>
              Customers
            </Link>
            <Link to="/reports" style={styles.navLink}>
              Reports
            </Link>
            <Link to="/rm-logs" style={styles.navLink}>
              My Logs
            </Link>
          </div>

          <div style={styles.content}>
            <Routes>
              <Route path="/" element={<Dashboard rmName={user} />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/rm-logs" element={<RMLogs rmEmail={user} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </RMProvider>
  );
}

export default App;

/* ========================= DASHBOARD HEADER ========================= */

interface DashboardHeaderProps {
  rmName: string;
  onLogout: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ rmName, onLogout }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = currentTime.toLocaleTimeString("en-GB", { hour12: false });

  return (
    <nav style={headerStyles.navbar}>
      <div style={headerStyles.left}>
        <img src={logo} alt="Company Logo" style={headerStyles.logo} />
        <span style={headerStyles.brand}>Kothi India RM RM Dashboard</span>
      </div>
      <div style={headerStyles.right}>
        <span style={headerStyles.rmName}>{rmName}</span>
        <span style={headerStyles.dateTime}>
          {formattedDate} {formattedTime}
        </span>
        <button style={headerStyles.logoutBtn} onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

/* ========================= STYLES ========================= */

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#111827",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  navLinks: {
    display: "flex",
    gap: 24,
    padding: "12px 24px",
  },
  navLink: {
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: 16,
  },
};

const headerStyles: { [key: string]: React.CSSProperties } = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    backgroundColor: "#1f2937",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  logo: {
    width: 80,
    height: "auto",
  },
  brand: {
    fontSize: 20,
    fontWeight: 600,
  },
  right: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 4,
  },
  rmName: {
    fontSize: 16,
    fontWeight: 500,
  },
  dateTime: {
    fontSize: 26,
    color: "#cccccc",
  },
  logoutBtn: {
    backgroundColor: "#dc2626",
    color: "#ffffff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
    marginTop: 4,
  },
};
