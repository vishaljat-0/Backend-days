import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

function Protected({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

    return children;

}
export default Protected;