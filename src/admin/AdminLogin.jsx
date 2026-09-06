import { useState } from "react";
import "./Admin.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Invalid admin username or password."
        );
      }

      sessionStorage.setItem("adminToken", data.token);
      onLogin(data.token);
    } catch (error) {
      setError(error.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">
            <img
                src="/images/gallery/gro.png"
                alt="Gandhi RO Water"
            />
        </div>

        <p className="admin-login-eyebrow">GANDHI RO WATER</p>

        <h1>Admin Login</h1>

        <p className="admin-login-subtitle">
          Sign in to manage orders.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="admin-username">Username</label>

          <input
            id="admin-username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            placeholder="Enter username"
          />

          <label htmlFor="admin-password">Password</label>

          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            placeholder="Enter password"
          />

          {error && (
            <p className="admin-login-error">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;