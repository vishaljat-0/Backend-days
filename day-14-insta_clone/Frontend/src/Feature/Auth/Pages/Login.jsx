import React, { useState } from "react";
import "../Style/Form.scss";
import { Link, useNavigate } from "react-router";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/UseAuth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handlelogin, loading } = useAuth();
  const navigate = useNavigate();
  let loginsubmit = (e) => {
    e.preventDefault();
    handlelogin(username, password).then((res) => console.log(res));
  }
  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={(e) => loginsubmit(e)}>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="Enter Username"
            name="username"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter password"
            name="password"
          />

          <button type="submit">Login</button>
        </form>
        <p>
          Dont have an account?{" "}
          <Link className="toggleform" to="/register">
            Register
          </Link>{" "}
        </p>
      </div>
    </main>
  );
}

export default Login;
