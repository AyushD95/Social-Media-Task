import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom"; 
import { Toaster } from "react-hot-toast";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/Dashboard";
import UserForm from "./pages/UserForm";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div style={{ backgroundColor: "#121212", color: "#f0f0f0", minHeight: "100vh" }}>

        <Toaster position="top-right" />

        <Navigation />

        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route
            path="/admin"
            element={
              isLoggedIn ? (
                <AdminDashboard setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <AdminLogin setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

const Navigation = () => {
  const navigate = useNavigate(); // Use navigate to programmatically navigate
  const location = useLocation();

  const isUserFormActive = location.pathname === "/";
  const isAdminLoginActive = location.pathname === "/admin";

  const handleNavigation = (path) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  const buttonStyles = {
    base: {
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      transition: "background-color 0.3s",
    },
    active: {
      backgroundColor: "#555",
      cursor: "not-allowed",
    },
    inactive: {
      backgroundColor: "#4caf50",
      cursor: "pointer",
    },
  };

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
        disabled={isUserFormActive}
        aria-disabled={isUserFormActive}
        style={{
          ...buttonStyles.base,
          ...(isUserFormActive ? buttonStyles.active : buttonStyles.inactive),
        }}
        onClick={() => handleNavigation("/")}
      >
        User Form
      </button>

      <button
        disabled={isAdminLoginActive}
        aria-disabled={isAdminLoginActive}
        style={{
          ...buttonStyles.base,
          ...(isAdminLoginActive ? buttonStyles.active : buttonStyles.inactive),
        }}
        onClick={() => handleNavigation("/admin")}
      >
        Admin Login
      </button>
    </nav>
  );
};

export default App;
