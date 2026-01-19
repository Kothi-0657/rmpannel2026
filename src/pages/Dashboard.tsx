import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logoa1.png"; // import the logo

interface DashboardProps {
  rmName: string; // pass RM name to display
}

const Dashboard: React.FC<DashboardProps> = ({ rmName }) => {
  const cards = [
    { title: "Customers", link: "/customers", color: "#10b981" },
    { title: "Reports", link: "/reports", color: "#8b5cf6" },
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <img src={logo} alt="Company Logo" style={styles.logo} />
        <div style={styles.rmName}>{rmName}</div>
      </div>

      {/* Cards */}
      <div style={styles.grid}>
        {cards.map((c) => (
          <Link
            key={c.title}
            to={c.link}
            style={{
              ...styles.card,
              background: `linear-gradient(135deg, ${c.color}, #111827)`,
            }}
          >
            {c.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: 32,
    minHeight: "100vh",
    backgroundColor: "#111827", // dark background
    color: "#ffffff",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: 40,
    gap: 20,
  },
  logo: {
    width: 100,
    height: "auto",
  },
  rmName: {
    fontSize: 20,
    fontWeight: 600,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: 24,
  },
  card: {
    height: 100,
    borderRadius: 16,
    color: "#ffffff",
    fontSize: 22,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
    transition: "transform 0.2s ease",
    cursor: "pointer",
  },
};
