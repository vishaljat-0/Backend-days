import React, { useState } from "react";
import { Link } from "react-router";
import "../Style/Form.scss";
import axios from "axios";
function Registration() {
  const [username, setUsername] = useState("");
  const [emial, setEmial] = useState("");
  const [password, setPassword] = useState("");
  let handlesubmit = (e) => {
    e.preventDefault();

    // "/api/auth"
    // authRouter.post("/register",register);

    axios
      .post("http://localhost:3000/api/auth/register", {
        username: username,
        email: emial,
        password: password,
      },{
        withCredentials:true
      })
      .then((res) => {
        console.log(res.data.message);
      });

    setUsername("");
    setEmial("");
    setPassword("");
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
            onChange={(e) => setEmial(e.target.value)}
            value={emial}
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
