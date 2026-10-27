import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    setMessage("");

    // Check empty fields
    if (!email.trim() || !password) {
      setMessage("Please enter both email and password.");
      return;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      setMessage("Please enter a valid email address.");
      return;
    }

    // Validate password
    if (password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      // Send login details to backend
      const response = await fetch("https://cinemora-login.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        navigate("/dashboard");
      } else {
        setMessage(data.message || "Invalid email or password.");
      }
    } catch (error) {
      setMessage(
        "Unable to connect to the server. Please check whether the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      {/* Background effects */}
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      {/* Header */}
      <header className="brand-header">
        <a className="brand-logo" href="/">
          <span className="brand-icon">C</span>
          <span>CINEMORA</span>
        </a>

        <span className="header-label">
          YOUR WORLD OF STORIES
        </span>
      </header>

      {/* Main content */}
      <section className="login-layout">
        {/* Welcome section */}
        <div className="welcome-section">
          <span className="eyebrow">
            ✦ YOUR NEXT CHAPTER STARTS HERE
          </span>

          <h1>
            Stories that
            <br />
            stay with <span>you.</span>
          </h1>

          <p className="welcome-description">
            Step into a world of unforgettable stories, cinematic
            moments and extraordinary experiences.
          </p>

          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">✦</span>

              <div>
                <h3>Discover something new</h3>
                <p>Find stories made for your taste.</p>
              </div>
            </div>

            <div className="feature-item">
              <span className="feature-icon">▶</span>

              <div>
                <h3>Your stories, your space</h3>
                <p>A personal experience, made for you.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Login card */}
        <section className="login-card">
          <div className="card-heading">
            <span className="card-label">
              MEMBER ACCESS
            </span>

            <h2>Welcome back</h2>

            <p>Sign in to continue your journey.</p>
          </div>

          <form onSubmit={handleLogin} noValidate>
            {/* Email field */}
            <div className="form-group">
              <label htmlFor="email">
                Email address
              </label>

              <input
                id="email"
                type="text"
                inputMode="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                autoComplete="username"
              />
            </div>

            {/* Password field */}
            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Error message */}
            {message && (
              <p className="error-message" role="alert">
                {message}
              </p>
            )}

            {/* Sign in button */}
            <button
              className="sign-in-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}

              {!loading && <span>→</span>}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="login-divider">
            <span>DEMO ACCESS</span>
          </div>

          <div className="demo-credentials">
            <p>
              <span>Email</span>
              <strong>admin@example.com</strong>
            </p>

            <p>
              <span>Password</span>
              <strong>Admin123</strong>
            </p>
          </div>

          <p className="security-note">
            Demo project · No real account required
          </p>
        </section>
      </section>

      {/* Footer */}
      <footer className="login-footer">
        <span>© 2026 CINEMORA</span>

        <span>DESIGNED FOR YOUR NEXT CHAPTER</span>
      </footer>
    </main>
  );
}

export default App;