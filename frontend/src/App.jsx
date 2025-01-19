import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom"; // Import useLocation
import { Toaster } from "react-hot-toast"; // Import Toaster from react-hot-toast
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/Dashboard";
import UserForm from "./components/UserForm";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Move the Router wrapping inside the component
  return (
    <Router>
      <div style={{ backgroundColor: "#121212", color: "#f0f0f0", minHeight: "100vh" }}>
        {/* Toaster for global toast notifications */}
        <Toaster position="top-right" />

        <Navigation />

        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/admin" element={ isLoggedIn ? ( <AdminDashboard setIsLoggedIn={setIsLoggedIn} /> ) : (<AdminLogin setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

// Create a separate Navigation component to avoid issues with useLocation
const Navigation = () => {
  const location = useLocation(); // Use useLocation within a component wrapped by Router

  const isUserFormActive = location.pathname === "/";
  const isAdminLoginActive = location.pathname === "/admin";

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        margin: "20px 0",
      }}
    >
      <button
        disabled={isUserFormActive} // Disable the button when on User Form page
        style={{
          backgroundColor: isUserFormActive ? "#555" : "#4caf50",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          cursor: isUserFormActive ? "not-allowed" : "pointer",
          borderRadius: "5px",
          transition: "background-color 0.3s",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#fff",
            fontWeight: isUserFormActive ? "bold" : "normal",
          }}
        >
          User Form
        </Link>
      </button>

      <button
        disabled={isAdminLoginActive} // Disable the button when on Admin Login page
        style={{
          backgroundColor: isAdminLoginActive ? "#555" : "#4caf50",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          cursor: isAdminLoginActive ? "not-allowed" : "pointer",
          borderRadius: "5px",
          transition: "background-color 0.3s",
        }}
      >
        <Link
          to="/admin"
          style={{
            textDecoration: "none",
            color: "#fff",
            fontWeight: isAdminLoginActive ? "bold" : "normal",
          }}
        >
          Admin Login
        </Link>
      </button>
    </nav>
  );
};

export default App;
