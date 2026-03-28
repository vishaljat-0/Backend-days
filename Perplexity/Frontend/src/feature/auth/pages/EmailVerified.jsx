import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EmailVerified() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-slate-950 text-white">
      
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-10 text-center w-100">

        <div className="text-5xl mb-4">✅</div>

        <h1 className="text-2xl font-semibold mb-2">
          Email Verified
        </h1>

        <p className="text-slate-400 text-sm mb-6">
          Your email has been successfully verified.  
          You will be redirected to login in 3 seconds.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="bg-linear-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition px-6 py-2 rounded-lg font-medium"
        >
          Go to Login
        </button>

      </div>

    </div>
  );
}