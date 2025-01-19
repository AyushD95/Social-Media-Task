import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/Dashboard";
import UserForm from "./components/UserForm";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div>
        <nav style={{ display: "flex", justifyContent: "center", gap: "20px", margin: "20px 0" }}>
          <Link to="/">User Form</Link>
          <Link to="/admin">Admin Login</Link>
        </nav>

        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route
            path="/admin"
            element={isLoggedIn ? <AdminDashboard setIsLoggedIn={setIsLoggedIn} /> : <AdminLogin setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
