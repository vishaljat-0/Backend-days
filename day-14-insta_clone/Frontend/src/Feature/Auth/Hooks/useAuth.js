import { useContext } from "react";
import {AuthContext} from "../Auth.context.jsx";
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
