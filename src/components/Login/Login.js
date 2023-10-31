import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // if (username == "manager") {
    //   navigate("/manager-dashboard");
    // } else {
    //   alert("Invalid username or password.");
    // }
    navigate("/manager-dashboard");
  };

  return (
    <div class="login-page">
        <div class="login-title">
            <h1>Kung Fu Tea</h1>
        </div>
        <div class="form">
            <form class="login-form">
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleLogin}>Log In</button>
            </form>
        </div>
    </div>
  );
}

export default Login;
