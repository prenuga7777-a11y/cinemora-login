const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock user credentials
const user = {
  email: "admin@example.com",
  password: "Admin123",
};

// Test backend
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CINEMORA Backend is running!",
  });
});

// Login API
app.post("/login", (req, res) => {
  const { email, password } = req.body || {};

  // 1. Check empty fields
  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password
  ) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  // 2. Validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address.",
    });
  }

  // 3. Validate password length
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must contain at least 6 characters.",
    });
  }

  // 4. Check mock credentials
  if (
    email.trim().toLowerCase() === user.email &&
    password === user.password
  ) {
    return res.status(200).json({
      success: true,
      message: "Login successful!",
      user: {
        email: user.email,
        name: "CINEMORA Demo User",
      },
    });
  }

  // 5. Invalid credentials
  return res.status(401).json({
    success: false,
    message: "Invalid email or password.",
  });
});

// Handle unknown API routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`CINEMORA Backend running at http://localhost:${PORT}`);
});