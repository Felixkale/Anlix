import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function BrandLogo({ className = "", alt = "Anlix logo" }) {
  return <img src="/anlix%20logo.png" alt={alt} className={className} />;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validUsername = "admin";
    const validPassword = "anlix123";

    if (
      form.username.trim() === validUsername &&
      form.password === validPassword
    ) {
      localStorage.setItem("anlix-auth", "true");
      navigate("/dashboard");
      return;
    }

    setError("Invalid username or password.");
  };

  return (
    <main className="login-page">
      <div className="login-bg-orb login-orb-one" />
      <div className="login-bg-orb login-orb-two" />

      <div className="login-shell">
        <div className="login-left">
          <Link to="/" className="login-back-link">
            ← Back to site
          </Link>

          <BrandLogo className="login-brand-logo" />

          <div className="login-kicker">Secure access</div>
          <h1 className="login-title">Login to Anlix Dashboard</h1>
          <p className="login-text">
            Use your credentials to access invoices, payments, quotations and
            dashboard activity.
          </p>

          <div className="login-demo-box">
            <div className="login-demo-title">Demo login</div>
            <div className="login-demo-row">
              <span>Username</span>
              <strong>admin</strong>
            </div>
            <div className="login-demo-row">
              <span>Password</span>
              <strong>anlix123</strong>
            </div>
          </div>
        </div>

        <div className="login-card">
          <div className="login-card-top">
            <span className="login-status-dot" />
            <span>ANLIX PORTAL</span>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter username"
                value={form.username}
                onChange={handleChange}
                autoComplete="username"
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </div>

            {error ? <div className="login-error">{error}</div> : null}

            <button type="submit" className="login-submit-btn">
              Login
            </button>

            <Link to="/" className="login-secondary-link">
              Return to landing page
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
}
