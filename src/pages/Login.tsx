import { useState } from "react";
import logo from "../assets/logoa1.png";

interface Props {
  onLogin: (email: string) => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    if (!email) {
      alert("Please enter your official email");
      return;
    }
    onLogin(email);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Logo */}
        <img src={logo} alt="Kothi India Logo" style={styles.logo} />

        {/* Title */}
        <h2 style={styles.title}>RM Login</h2>
        <p style={styles.subtitle}>Kothi India RM Dashboard</p>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter official email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        {/* Login Button */}
        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>

        {/* Footer note */}
        <p style={styles.note}>
          Only authorized RM emails are allowed
        </p>
      </div>
    </div>
  );
};

export default Login;

/* =========================
   STYLES
   ========================= */

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #111827, #1f2937)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 360,
    backgroundColor: "#111827",
    padding: "32px 28px",
    borderRadius: 14,
    boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
    textAlign: "center",
    border: "1px solid #374151",
  },
  logo: {
    width: 120,
    marginBottom: 20,
  },
  title: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: 600,
    marginBottom: 4,
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: 14,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    padding: "12px 14px",
    borderRadius: 8,
    border: "1px solid #374151",
    backgroundColor: "#1f2937",
    color: "#ffffff",
    fontSize: 24,
    outline: "none",
    marginBottom: 16,
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.2s ease",
  },
  note: {
    marginTop: 16,
    fontSize: 12,
    color: "#9ca3af",
  },
};
