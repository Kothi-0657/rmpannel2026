import React, { useState } from "react";

const Login = ({ onLogin }: { onLogin: (email: string) => void }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check empty
    if (!email) return alert("Enter your email");

    // Check domain
    if (!email.endsWith("@kothiindia.com")) {
      return alert("Only @kothiindia.com emails allowed");
    }

    // Call login
    onLogin(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        className="bg-gray-800 bg-opacity-30 backdrop-blur-md p-10 rounded-2xl shadow-xl w-96"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          RM Panel Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-6 rounded-xl bg-gray-700 bg-opacity-50 border border-gray-600 text-white focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl font-bold hover:from-purple-700 hover:to-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
