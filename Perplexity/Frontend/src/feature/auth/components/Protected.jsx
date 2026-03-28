import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../../../components/Loader";

function Protected({ children }) {

  const user = useSelector((state) => state.auth?.user);
  const loading = useSelector((state) => state.auth?.loading);

 if (loading) return (
  <div className="fixed inset-0 flex items-center justify-center bg-[#080a12]">
    <Loader text="Initializing" />
  </div>
);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default Protected;