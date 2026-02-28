import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import "../Style/Form.scss";
import { useAuth } from "../Hooks/UseAuth";
import { Navigate } from "react-router";
function Registration() {
  const { handleregister, loading } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  let handlesubmit = (e) => {
    e.preventDefault();

    handleregister(username, email, password).then((res) => console.log(res));
    navigate("/");
  };

  return (
    <main>
      <div
        className="form-container {
"
      >
        <h1>Register</h1>
        <form onSubmit={(e) => handlesubmit(e)}>
          <input
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            value={username}
            placeholder="Enter Username"
            type="text"
          />
          <input
            onChange={(e) => setemail(e.target.value)}
            value={email}
            name="email"
            placeholder="Enter Email"
            type="text"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            placeholder="Enter Password"
            type="password"
          />
          <button>Register</button>
        </form>
        <p>
          Already have a account{" "}
          <Link className="toggleform" to="/login">
            Login
          </Link>{" "}
        </p>
      </div>
    </main>
  );
}

export default Registration;
