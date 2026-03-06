import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { register, login, getme, logout } from "../services/auth.api";

 export const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = context;

  const handleregister = async ({ username, email, password }) => {
    setLoading(true);
    const data = await register({ username, email, password });
    setUser(data.user);
    setLoading(false);
  };

  const handlelogin = async ({ username, email, password }) => {
    setLoading(true);
    const data = await login({ username, email, password });
    setUser(data.user);
    setLoading(false);
  };

  const handlelogout = async () => {
    setLoading(true);
    const data = await logout();
    setUser(null);
    setLoading(false);
  };

  const handlegetme = async () => {
  setLoading(true);

  try {
    const data = await getme();
    setUser(data.user);
  } catch (error) {
    setUser(null); // user not logged in
  } finally {
    setLoading(false); // always stop loading
  }
};
   useEffect(() => {
        handlegetme()
    }, [])

  return {
    user,
    setUser,
    loading,
    setLoading,
    handleregister,
    handlelogin,
    handlelogout,
    handlegetme,
  };
};
