import React from "react";
import { useNavigate } from "react-router-dom";
import "./ManagerDashboard.css"

function ManagerDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <html>
        <body>
            <div class="sidebar">
                <h1>Kung Fu Tea</h1>
                <ul class="nav-links">
                    <li><a href="/Manager-Dashboard">Dashboard</a></li>
                    <li><a href="#">Orders</a></li>
                    <li><a href="#">Inventory</a></li>
                    <li><a href="#">Menu</a></li>
                    <li><a href="#">Employees</a></li>
                    <li><a href="/">Logout</a></li>
                </ul> 
            </div>
        </body>
    </html>
  );
}

export default ManagerDashboard;
