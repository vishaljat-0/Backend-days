import React, { useEffect, useRef, useState } from "react";
import "../styles/login.scss";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { loading, setLoading, handlelogin } = useAuth();


  const handleformSubmit = async (e) => {
    e.preventDefault();
    await handlelogin({
      username: username,
      email: username,
      password,
    });

    setpassword("");
    setusername("");
    navigate("/");
  };
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
useEffect(() => {
  const container = containerRef.current;

  if (!container) return;

  const handleAnimationEnd = () => {
    container.classList.remove("active");
  };

  container.addEventListener("animationend", handleAnimationEnd);

  return () => {
    container.removeEventListener("animationend", handleAnimationEnd);
  };
}, []);


  if(loading) {
    return <div>Loading...</div>
  }
  return (
    <main className="login-page">
      <div className="outer">
        <div className="side-animation">
          <div
            className="container"
            ref={containerRef}
            onClick={(e) => e.currentTarget.classList.toggle("active")}
          >
            <span className="text">LOGIN</span>

            {/* Base Fingerprint */}
            <svg
              className="fingerprint fingerprint-base"
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 100 100"
            >
              <g
                className="fingerprint-out"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path
                  className="odd"
                  d="m25.117139,57.142857c0,0-1.968558-7.660465-0.643619-13.149003 1.324939-5.488538 4.659682-8.994751 4.659682-8.994751"
                />
                <path
                  className="odd"
                  d="m31.925369,31.477584c0,0 2.153609-2.934998 9.074971-5.105078 6.921362-2.17008 11.799844-0.618718 11.799844-0.618718"
                />
                <path
                  className="odd"
                  d="m57.131213,26.814448c0,0 5.127709 1.731228 9.899495 7.513009 4.771786 5.781781 4.772971 12.109204 4.772971 12.109204"
                />
                <path
                  className="odd"
                  d="m72.334009,50.76769 0.09597 2.298098 -0.09597 2.386485"
                />
                <path
                  className="even"
                  d="m27.849282,62.75c0,0 1.286086-1.279223 1.25-4.25 -0.03609-2.970777-1.606117-7.675266-0.625-12.75 0.981117-5.074734 4.5-9.5 4.5-9.5"
                />
                <path
                  className="even"
                  d="m36.224282,33.625c0,0 8.821171-7.174484 19.3125-2.8125 10.491329 4.361984 11.870558 14.952665 11.870558 14.952665"
                />
                <path
                  className="even"
                  d="m68.349282,49.75c0,0 0.500124 3.82939 0.5625 5.8125 0.06238 1.98311-0.1875 5.9375-0.1875 5.9375"
                />
                <path
                  className="odd"
                  d="m31.099282,65.625c0,0 1.764703-4.224042 2-7.375 0.235297-3.150958-1.943873-9.276886 0.426777-15.441942 2.370649-6.165056 8.073223-7.933058 8.073223-7.933058"
                />
                <path
                  className="odd"
                  d="m45.849282,33.625c0,0 12.805566-1.968622 17 9.9375 4.194434 11.906122 1.125 24.0625 1.125 24.0625"
                />
              </g>
            </svg>

            {/* Active Fingerprint */}
            <svg
              className="fingerprint fingerprint-active"
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 100 100"
            >
              <g
                className="fingerprint-out"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path
                  className="odd"
                  d="m37.774165,70.831845c0,0 2.692139-6.147592 3.223034-11.251208 0.530895-5.103616-2.18372-7.95562-0.153491-13.647655 2.030229-5.692035 8.108442-4.538898 8.108442-4.538898"
                />
                <path
                  className="odd"
                  d="m54.391174,71.715729c0,0 2.359472-5.427681 2.519068-16.175068 0.159595-10.747388-4.375223-12.993087-4.375223-12.993087"
                />
                <path
                  className="even"
                  d="m49.474282,73.625c0,0 3.730297-8.451831 3.577665-16.493718-0.152632-8.041887-0.364805-11.869326-4.765165-11.756282-4.400364 0.113044-3.875 4.875-3.875 4.875"
                />
                <path
                  className="even"
                  d="m41.132922,72.334447c0,0 2.49775-5.267079 3.181981-8.883029 0.68423-3.61595 0.353553-9.413359 0.353553-9.413359"
                />
                <path
                  className="odd"
                  d="m45.161782,73.75c0,0 1.534894-3.679847 2.40625-6.53125 0.871356-2.851403 1.28125-7.15625 1.28125-7.15625"
                />
              </g>
            </svg>

            <svg
              className="ok"
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 100 100"
            >
              <path
                d="M34.912 50.75l10.89 10.125L67 36.75"
                fill="none"
                stroke="#fff"
                strokeWidth="6"
              />
            </svg>
          </div>
          <p>Welcome back! Please login to your account.</p>
        </div>

        <div className="form-container">
          <h2>Login</h2>

          <form onSubmit={(e) => handleformSubmit(e)}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Username or Email"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                placeholder="Password"
                id="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            <button className="button" type="submit">
              Login
            </button>
          </form>

          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;
