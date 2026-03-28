import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {useAuth} from "../hook/auth.hook.js";
import { useSelector } from "react-redux";

const Eye = ({ open }) =>
  open ? (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );

function Orbs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="orb1 absolute rounded-full"
        style={{
          width: 640, height: 640,
          top: "-180px", left: "-160px",
          background: "radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)",
        }}
      />
      <div className="orb2 absolute rounded-full"
        style={{
          width: 520, height: 520,
          bottom: "-120px", right: "-120px",
          background: "radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 70%)",
        }}
      />
      <div className="orb3 absolute rounded-full"
        style={{
          width: 320, height: 320,
          top: "38%", left: "55%",
          background: "radial-gradient(circle, rgba(244,114,182,0.12) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

export default function LoginPage() {
  const [form,     setForm]    = useState({ email: "", password: "" });
  const [errors,   setErrors]  = useState({});
  const [showPw,   setShowPw]  = useState(false);
  const [loading,  setLoading] = useState(false);
  const [done,     setDone]    = useState(false);
  const [focused,  setFocused] = useState("");
  const [mounted,  setMounted] = useState(false);
  const [remember, setRemember]= useState(false);


    // const user = useSelector((state) => state.auth?.user);
  // const loading  = useSelector((state) => state.auth?.loading);


  // if(!loading && user) return <Navigate to="/" replace />

  const {handlelogin} = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
  if (done) {
    const timer = setTimeout(() => {
      navigate("/");
      
    }, 2000);

    return () => clearTimeout(timer);
  }
}, [done, navigate]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const set = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.email.trim())    e.email    = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email address";
    if (!form.password)        e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Minimum 8 characters";
    return e;
  };

const handleSubmit = async () => {
  const e = validate();

  if (Object.keys(e).length) {
    setErrors(e);
    return;
  }

  setLoading(true);
  setErrors({});

  const payload = {
    email: form.email,
    password: form.password
  };

  try {
    // call login api
    const res = await handlelogin(payload);

    // if api succeeds
    setDone(true);

  } catch (err) {
    // if api fails
    setErrors({
      email: err?.response?.data?.message || "Invalid email or password"
    });
  }

  setLoading(false);
};

  const inputClass = (field) => [
    "w-full rounded-[11px] px-[14px] py-[12.5px] text-[14px] outline-none transition-all duration-200 font-[inherit]",
    "text-zinc-100 placeholder:text-white/20",
    errors[field]
      ? "border-[1.5px] border-red-400/65 bg-white/[0.04]"
      : focused === field
        ? "border-[1.5px] border-violet-500/65 bg-violet-600/[0.08] shadow-[0_0_0_3.5px_rgba(124,58,237,0.12)]"
        : "border-[1.5px] border-white/[0.08] bg-white/[0.04]",
  ].join(" ");

  /* ── success screen ── */
  if (done) return (
    <div className="min-h-screen bg-[#08080f] flex items-center justify-center font-['DM_Sans',system-ui,sans-serif]">
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      <Orbs />
      <div className="text-center animate-[fadeUp_0.5s_ease_both]">
        <div className="w-17 h-17 rounded-full mx-auto mb-5 flex items-center justify-center
          bg-linear-to-br from-violet-600/25 to-sky-500/20 border border-violet-500/40">
          <svg className="w-7 h-7 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="mb-1.5 text-[22px] font-light text-zinc-100 tracking-[-0.01em]">
          Welcome back,{" "}
          <span className="font-medium bg-linear-to-r from-violet-400 to-sky-400 bg-clip-text text-transparent">
            {form.email.split("@")[0]}
          </span>
        </p>
        <p className="mb-7 text-[13px] text-white/35">You're signed in successfully.</p>
        <button
          onClick={() => { setDone(false); setForm({ email: "", password: "" }); }}
          className="bg-transparent border-none cursor-pointer text-xs text-white/30 underline"
        >
          ← Back to login
        </button>
      </div>
      <Styles />
    </div>
  );

  /* ── login form ── */
  return (
    <div className="min-h-screen bg-[#08080f] flex items-center justify-center p-4 font-['DM_Sans',system-ui,sans-serif]">
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      <Orbs />

      <div
        className="relative w-full max-w-107.5 transition-[opacity,transform] duration-550 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          opacity:   mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(22px)",
        }}
      >
        {/* gradient border */}
        <div className="absolute -inset-[1.5px] rounded-[21px] z-0 opacity-70"
          style={{ background: "linear-gradient(135deg,rgba(124,58,237,.7) 0%,rgba(99,102,241,.4) 40%,rgba(14,165,233,.5) 80%,rgba(244,114,182,.3) 100%)" }}
        />

        {/* card */}
        <div className="relative z-1 rounded-[20px] px-9.5 pt-9.5 pb-7.5"
          style={{ background: "linear-gradient(160deg,rgba(14,14,24,.98) 0%,rgba(10,10,18,.99) 100%)" }}
        >
          {/* brand */}
          <div className="flex items-center gap-2.5 mb-7.5">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <circle cx="15" cy="15" r="14" stroke="url(#g1)" strokeWidth="1.5" />
              <path d="M10 15h10M15 10v10" stroke="url(#g2)" strokeWidth="2.2" strokeLinecap="round" />
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8b5cf6" /><stop offset="1" stopColor="#38bdf8" />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#c4b5fd" /><stop offset="1" stopColor="#7dd3fc" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-[17px] font-medium tracking-[0.01em] bg-linear-to-r from-[#e4e4f0] to-[#9ca3c5] bg-clip-text text-transparent">
              Perplexity
            </span>
          </div>

          {/* heading */}
          <div className="mb-7.5">
            <h1 className="m-0 mb-1.5 text-[27px] font-light tracking-[-0.02em] leading-tight bg-linear-to-br from-zinc-100 to-violet-300/85 bg-clip-text text-transparent">
              Welcome back
            </h1>
            <p className="m-0 text-[13.5px] text-white/38 font-light tracking-[0.01em]">
              Sign in to continue your AI‑powered journey.
            </p>
          </div>

          {/* fields */}
          <div className="flex flex-col gap-4.5">

            {/* email */}
            <div className="animate-[fadeUp_0.4s_ease_0.1s_both]">
              <label className="block text-[11px] font-medium tracking-[0.08em] uppercase text-white/32 mb-1.75">
                Email address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={set("email")}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                placeholder="you@example.com"
                className={inputClass("email")}
              />
              {errors.email && (
                <p className="mt-1.25 text-[11px] text-red-400">{errors.email}</p>
              )}
            </div>

            {/* password */}
            <div className="animate-[fadeUp_0.4s_ease_0.17s_both]">
              <div className="flex justify-between items-center mb-1.75">
                <label className="text-[11px] font-medium tracking-[0.08em] uppercase text-white/32">
                  Password
                </label>
                <a
                  href="/forgot-password"
                  onClick={(e) => { e.preventDefault(); alert("Navigate → /forgot-password"); }}
                  className="text-[11px] font-normal bg-linear-to-r from-violet-400 to-sky-400 bg-clip-text text-transparent no-underline cursor-pointer tracking-[0.01em]"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={set("password")}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                  placeholder="••••••••"
                  className={`${inputClass("password")} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute right-3.25 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-white/28 flex items-center transition-colors duration-200 hover:text-white/70"
                >
                  <Eye open={showPw} />
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.25 text-[11px] text-red-400">{errors.password}</p>
              )}
            </div>
          </div>

          {/* remember me */}
          <div className="flex items-center gap-2.25 mt-4.5 animate-[fadeUp_0.4s_ease_0.24s_both]">
            <div
              onClick={() => setRemember((s) => !s)}
              className={[
                "w-4.5 h-4.5 rounded-[5px] shrink-0 flex items-center justify-center cursor-pointer transition-all duration-200",
                remember
                  ? "bg-linear-to-br from-violet-700 to-sky-500 border-0 shadow-[0_0_10px_rgba(124,58,237,0.4)]"
                  : "border-[1.5px] border-white/18 bg-white/4",
              ].join(" ")}
            >
              {remember && (
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span
              className="text-[13px] text-white/38 cursor-pointer select-none"
              onClick={() => setRemember((s) => !s)}
            >
              Remember me
            </span>
          </div>

          {/* live preview */}
          {form.email && (
            <div className="mt-4.5 rounded-[11px] px-3.5 py-2.5 border border-violet-500/18 animate-[fadeUp_0.3s_ease_both]"
              style={{ background: "linear-gradient(135deg,rgba(124,58,237,.09),rgba(14,165,233,.06))" }}
            >
              <p className="m-0 mb-1 text-[10px] tracking-widest uppercase text-white/22">Signing in as</p>
              <p className="m-0 text-[12.5px] text-violet-300 font-medium">{form.email}</p>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={[
              "mt-5.5 w-full border-none rounded-[11px] py-[13.5px] text-[14px] font-medium text-white tracking-[0.02em] transition-all duration-250 flex items-center justify-center gap-2 font-[inherit] animate-[fadeUp_0.4s_ease_0.32s_both]",
              loading
                ? "cursor-not-allowed bg-violet-600/30"
                : "cursor-pointer shadow-[0_4px_28px_rgba(99,102,241,0.4),0_1px_0_rgba(255,255,255,0.12)_inset] hover:shadow-[0_6px_36px_rgba(99,102,241,0.58),0_1px_0_rgba(255,255,255,0.12)_inset] hover:-translate-y-[1.5px]",
            ].join(" ")}
            style={loading ? {} : { background: "linear-gradient(135deg,#7c3aed 0%,#6366f1 50%,#0ea5e9 100%)" }}
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin shrink-0" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,.3)" strokeWidth="3" />
                  <path d="M12 2a10 10 0 0110 10" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                </svg>
                Signing in…
              </>
            ) : "Sign in →"}
          </button>

          
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/[0.07]" />
            <span className="text-[10px] text-white/20 tracking-widest uppercase">or</span>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>

       

          {/* register link */}
          <p className="text-center mt-5.5 mb-0 text-[13.5px] text-white/32">
            Don't have an account?{" "}
            <a
              href="/register"
              onClick={(e) => { e.preventDefault(); navigate("/register"); }}
              className="bg-linear-to-r from-violet-400 to-sky-400 bg-clip-text text-transparent font-medium no-underline cursor-pointer"
            >
              Sign up
            </a>
          </p>
        </div>

        <p className="text-center mt-3.5 mb-0 text-[11px] text-white/18 tracking-[0.03em]">
          Protected by{" "}
          <span className="text-white/35">256-bit encryption</span> · Perplexity AI
        </p>
      </div>

      <Styles />
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
      @keyframes orbFloat1 {
        0%,100%{ transform:translate(0,0) scale(1); }
        50%    { transform:translate(50px,35px) scale(1.07); }
      }
      @keyframes orbFloat2 {
        0%,100%{ transform:translate(0,0) scale(1); }
        50%    { transform:translate(-35px,-45px) scale(1.05); }
      }
      @keyframes orbFloat3 {
        0%,100%{ transform:translate(0,0) scale(1); }
        50%    { transform:translate(22px,-22px) scale(1.1); }
      }
      .orb1 { animation: orbFloat1 13s ease-in-out infinite; }
      .orb2 { animation: orbFloat2 16s ease-in-out infinite; }
      .orb3 { animation: orbFloat3 11s ease-in-out infinite; }
      @keyframes fadeUp {
        from { opacity:0; transform:translateY(16px); }
        to   { opacity:1; transform:translateY(0); }
      }
      @keyframes spin { to { transform:rotate(360deg); } }
      input::placeholder { color:rgba(255,255,255,.18); }
      input:-webkit-autofill,
      input:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0 1000px #0d0d1a inset !important;
        -webkit-text-fill-color: #f4f4f5 !important;
      }
    `}</style>
  );
}