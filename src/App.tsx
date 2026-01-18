import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import { RMProvider } from "./context/RMContext";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // check localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("rmEmail");
    if (storedEmail) setUser(storedEmail);
    setLoading(false);
  }, []);

  if (loading) return <div className="text-white p-8">Loading...</div>;

  if (!user) {
    return <Login onLogin={(email) => { localStorage.setItem("rmEmail", email); setUser(email); }} />;
  }

  return (
    <RMProvider rmEmail={user}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <nav className="bg-gray-800 text-white p-4 flex justify-between">
            <span className="font-bold">RM Panel</span>
            <button
              onClick={() => { localStorage.removeItem("rmEmail"); setUser(null); }}
              className="bg-red-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          </nav>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </RMProvider>
  );
}

export default App;
