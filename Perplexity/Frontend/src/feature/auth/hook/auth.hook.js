import { useDispatch } from "react-redux";
import { setError, setLoading ,setUser} from "../auth.slice";
import { getme, login, register } from "../service/auth.api";

export const useAuth = () => {
  const dispatch = useDispatch();

  const handleregister = async ({ username, email, password }) => {
    try {
      dispatch(setLoading(true));
      const data = await register({ username, email, password });
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || " Registration failed"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handlelogin = async ({ email, password }) => {
    try {
      dispatch(setLoading(true));

      const data = await login({ email, password });
      dispatch(setUser(data.user));

      return data; // ✅ return response to LoginPage
    } catch (error) {
      dispatch(setError(error.response?.data?.message || "Login failed"));

      throw error; // ✅ send error to catch block in LoginPage
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handlegetme = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getme();
      dispatch(setUser(data.user));
    } catch (error) {
      dispatch(setError(error.response?.data?.message || " Login failed"));
    } finally {
      dispatch(setLoading(false));
    }
  };
  return {
    handleregister,
    handlelogin,
    handlegetme,
  };
};
