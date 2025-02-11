import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; // Import toast from react-hot-toast

const AdminLogin = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("123");
  const [loading, setLoading] = useState(false); // State for loading

  const handleLogin = async (e) => {
    e.preventDefault();
    
    setLoading(true); // Set loading to true before making the request
    
    try {
      const response = await axios.post("https://backetest.onrender.com/admin/api/login", { username, password });
      setLoading(false); // Stop loading after the response
      
      if (response.data.success) {
        localStorage.setItem("adminLoggedIn", "true");
        setIsLoggedIn(true);
        toast.success("Login successful"); // Use react-hot-toast for success message
      }
    } catch (error) {
      setLoading(false); // Stop loading on error
      toast.error(error.response?.data?.message || "Login failed"); // Use react-hot-toast for error message
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        backgroundColor: "#121212", // Dark mode background
        color: "#f0f0f0", // Light text color
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Admin Login</h2>
      <form
        onSubmit={handleLogin}
        style={{
          display: "inline-block",
          backgroundColor: "#1e1e1e", // Form background
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "10px",
              width: "300px",
              backgroundColor: "#333",
              color: "#f0f0f0",
              border: "1px solid #555",
              borderRadius: "5px",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "10px",
              width: "300px",
              backgroundColor: "#333",
              color: "#f0f0f0",
              border: "1px solid #555",
              borderRadius: "5px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            cursor: "pointer",
            padding: "10px 20px",
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
          disabled={loading} // Disable button while loading
        >
          {loading ? "Processing..." : "Login"}
        </button>
      </form>

      {loading && (
        <div style={{ marginTop: "20px" }}>
          <p style={{ color: "#f0f0f0" }}>Backend may take 40-60 seconds to respond as it is hosted on render</p>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid #f0f0f0",
              borderTop: "4px solid #4caf50",
              borderRadius: "50%",
              margin: "10px auto",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
      )}

      <p>
        Username: admin <br />
        Password: 123
      </p>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default AdminLogin;
