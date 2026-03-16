import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */
const EyeOpen = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeClosed = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

const CheckTiny = () => (
  <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const Spinner = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-spin">
    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
    <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/* ─────────────────────────────────────────────
   Background orbs
───────────────────────────────────────────── */
function Orbs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      <div
        className="orb1 absolute rounded-full"
        style={{ width: 600, height: 600, top: -160, left: -160, background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 68%)" }}
      />
      <div
        className="orb2 absolute rounded-full"
        style={{ width: 500, height: 500, bottom: -120, right: -120, background: "radial-gradient(circle, rgba(14,165,233,0.16) 0%, transparent 68%)" }}
      />
      <div
        className="orb3 absolute rounded-full"
        style={{ width: 280, height: 280, top: "40%", left: "58%", background: "radial-gradient(circle, rgba(244,114,182,0.12) 0%, transparent 68%)" }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Password strength
───────────────────────────────────────────── */
const strengthColors = ["#f87171", "#fb923c", "#facc15", "#34d399"];

function PasswordStrength({ password }) {
  const rules = [
    { label: "8+ chars",  ok: password.length >= 8 },
    { label: "Uppercase", ok: /[A-Z]/.test(password) },
    { label: "Number",    ok: /[0-9]/.test(password) },
    { label: "Symbol",    ok: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = rules.filter((r) => r.ok).length;
  const color = strengthColors[score - 1] ?? "rgba(255,255,255,0.1)";
  if (!password) return null;

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-0.5 flex-1 rounded-full transition-all duration-500"
            style={{ background: i < score ? color : "rgba(255,255,255,0.08)" }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-0.5">
        {rules.map((r) => (
          <span
            key={r.label}
            className="flex items-center gap-1 text-[11px] transition-colors duration-300"
            style={{ color: r.ok ? "#86efac" : "rgba(255,255,255,0.28)" }}
          >
            <CheckTiny /> {r.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Field component
───────────────────────────────────────────── */
function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold tracking-[0.07em] uppercase text-white/30">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-[11px] text-red-400/90 mt-0.5">{error}</p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm]       = useState({ username: "", email: "", password: "" });
  const [errors, setErrors]   = useState({});
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [focused, setFocused] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);

  /* two-way binding helper */
  const bind = (field) => ({
    value: form[field],
    onChange: (e) => {
      setForm((p) => ({ ...p, [field]: e.target.value }));
      if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
    },
    onFocus: () => setFocused(field),
    onBlur:  () => setFocused(""),
  });

  const validate = () => {
    const e = {};
    if (!form.username.trim())         e.username = "Username is required";
    else if (form.username.length < 3) e.username = "Minimum 3 characters";
    if (!form.email.trim())            e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.password)                e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Minimum 8 characters";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setDone(true);
  };

  /* shared input class builder */
  const inputCls = (field, extra = "") =>
    [
      "w-full rounded-xl px-4 py-3 text-sm text-white/90 outline-none transition-all duration-200",
      "placeholder:text-white/20 font-[inherit]",
      errors[field]
        ? "bg-red-500/5 border border-red-500/40 shadow-[0_0_0_3px_rgba(239,68,68,0.08)]"
        : focused === field
        ? "bg-violet-500/8 border border-violet-500/60 shadow-[0_0_0_3px_rgba(124,58,237,0.12)]"
        : "bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15]",
      extra,
    ].join(" ");

  /* ── success state ── */
  if (done) {
    return (
      <div className="min-h-screen bg-[#09090f] flex items-center justify-center">
        <Orbs />
        <div className="relative z-10 text-center px-4 animate-[fadeUp_0.5s_ease_both]">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center border border-violet-500/30"
            style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.22), rgba(14,165,233,0.18))" }}
          >
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#a78bfa" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-light text-white/90 mb-1">
            Welcome,{" "}
            <span
              className="font-medium"
              style={{ background: "linear-gradient(90deg,#a78bfa,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              {form.username}
            </span>
          </h2>
          <p className="text-sm text-white/35 mb-6">Your account has been created.</p>
          <button
            onClick={() => { setDone(false); setForm({ username: "", email: "", password: "" }); }}
            className="text-xs text-white/25 underline underline-offset-4 hover:text-white/50 transition-colors bg-transparent border-none cursor-pointer"
          >
            ← Back to register
          </button>
        </div>
        <GlobalStyles />
      </div>
    );
  }

  /* ── main form ── */
  return (
    <div className="min-h-screen bg-[#09090f] flex items-center justify-center px-4 py-10">
      <Orbs />

      <div
        className="relative z-10 w-full max-w-105 transition-[opacity,transform] duration-500 ease-out"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)" }}
      > 
        {/* glowing gradient border */}
        <div
          className="absolute -inset-px rounded-2xl opacity-60 pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.8), rgba(99,102,241,0.5), rgba(14,165,233,0.6), rgba(244,114,182,0.4))" }}
        />

        {/* card surface */}
        <div
          className="relative rounded-2xl px-7 py-8 sm:px-8"
          style={{ background: "linear-gradient(155deg, rgba(16,16,26,0.97), rgba(11,11,19,0.98))" }}
        >

          {/* ── brand ── */}
          <div className="flex items-center gap-2.5 mb-7">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="url(#b1)" strokeWidth="1.5" />
              <path d="M9 14h10M14 9v10" stroke="url(#b2)" strokeWidth="2" strokeLinecap="round" />
              <defs>
                <linearGradient id="b1" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8b5cf6" /><stop offset="1" stopColor="#38bdf8" />
                </linearGradient>
                <linearGradient id="b2" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#c4b5fd" /><stop offset="1" stopColor="#7dd3fc" />
                </linearGradient>
              </defs>
            </svg>
            <span
              className="text-base font-medium tracking-wide"
              style={{ background: "linear-gradient(90deg,#e9e9f4,#9ca3c0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              Perplexity
            </span>
          </div>

          {/* ── heading ── */}
          <div className="mb-7">
            <h1
              className="text-2xl font-light tracking-tight leading-snug mb-1"
              style={{ background: "linear-gradient(135deg, #f0f0f5 25%, rgba(167,139,250,0.85))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              Create your account
            </h1>
            <p className="text-[13px] text-white/35 font-light">
              Start exploring with AI‑powered search.
            </p>
          </div>

          {/* ── form fields ── */}
          <div className="flex flex-col gap-5">

            {/* username */}
            <Field label="Username" error={errors.username}>
              <input
                type="text"
                placeholder="your_handle"
                className={inputCls("username")}
                {...bind("username")}
              />
            </Field>

            {/* email */}
            <Field label="Email address" error={errors.email}>
              <input
                type="email"
                placeholder="you@example.com"
                className={inputCls("email")}
                {...bind("email")}
              />
            </Field>

            {/* password */}
            <Field label="Password" error={errors.password}>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  className={inputCls("password", "pr-11")}
                  {...bind("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors border-none bg-transparent cursor-pointer p-0.5"
                >
                  {showPw ? <EyeOpen /> : <EyeClosed />}
                </button>
              </div>
              <PasswordStrength password={form.password} />
            </Field>
          </div>

          {/* ── live preview ── */}
          {(form.username || form.email) && (
            <div
              className="mt-5 rounded-xl px-4 py-3 border border-violet-500/15"
              style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.07), rgba(14,165,233,0.04))" }}
            >
              <p className="text-[10px] uppercase tracking-widest text-white/20 mb-1">Live preview</p>
              <p className="text-[12.5px] leading-none">
                {form.username && (
                  <span className="text-violet-300 font-medium">{form.username}</span>
                )}
                {form.username && form.email && (
                  <span className="text-white/20 mx-1">·</span>
                )}
                {form.email && (
                  <span className="text-white/40">{form.email}</span>
                )}
              </p>
            </div>
          )}

          {/* ── submit ── */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={[
              "mt-6 w-full rounded-xl py-3.5 text-sm font-medium text-white tracking-wide",
              "flex items-center justify-center gap-2 border-none cursor-pointer",
              "transition-all duration-200 ease-out",
              loading ? "opacity-60 cursor-not-allowed" : "hover:-translate-y-0.5 active:translate-y-0",
            ].join(" ")}
            style={{
              background: loading
                ? "rgba(124,58,237,0.3)"
                : "linear-gradient(135deg, #7c3aed, #6366f1, #0ea5e9)",
              boxShadow: loading ? "none" : "0 4px 24px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            {loading ? <><Spinner />Creating account…</> : "Create account →"}
          </button>

          {/* ── divider ── */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/[0.07]" />
            <span className="text-[10px] text-white/20 tracking-widest uppercase">or</span>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>

          {/* ── login link ── */}
          <p className="text-center text-[13px] text-white/30 m-0">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-medium bg-transparent border-none cursor-pointer p-0 text-[13px]"
              style={{ background: "linear-gradient(90deg,#a78bfa,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              Sign in
            </button>
          </p>
        </div>

        {/* fine print */}
        <p className="text-center text-[11px] text-white/15 mt-4 tracking-wide px-2">
          By registering you agree to our{" "}
          <span className="text-white/30 hover:text-white/50 cursor-pointer transition-colors">Terms</span>
          {" "}&{" "}
          <span className="text-white/30 hover:text-white/50 cursor-pointer transition-colors">Privacy Policy</span>
        </p>
      </div>

      <GlobalStyles />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Global keyframes
───────────────────────────────────────────── */
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
      body { font-family: 'DM Sans', system-ui, sans-serif; }

      @keyframes orbFloat1 {
        0%,100% { transform: translate(0,0) scale(1); }
        50%     { transform: translate(44px,32px) scale(1.06); }
      }
      @keyframes orbFloat2 {
        0%,100% { transform: translate(0,0) scale(1); }
        50%     { transform: translate(-32px,-40px) scale(1.05); }
      }
      @keyframes orbFloat3 {
        0%,100% { transform: translate(0,0) scale(1); }
        50%     { transform: translate(18px,-18px) scale(1.09); }
      }
      @keyframes fadeUp {
        from { opacity:0; transform:translateY(14px); }
        to   { opacity:1; transform:translateY(0); }
      }

      .orb1 { animation: orbFloat1 12s ease-in-out infinite; }
      .orb2 { animation: orbFloat2 15s ease-in-out infinite; }
      .orb3 { animation: orbFloat3 10s ease-in-out infinite; }

      input::placeholder { color: rgba(255,255,255,0.18) !important; }
      input:-webkit-autofill,
      input:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0 1000px #0e0e1b inset !important;
        -webkit-text-fill-color: rgba(255,255,255,0.9) !important;
      }
    `}</style>
  );
}