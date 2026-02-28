import { useState, createContext, useEffect, useContext } from "react";
import { registration, login } from "../Auth/service/Auth.api"

// export const AuthContext = createContext();
export const AuthContext = createContext();

export const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(false);

  let handlelogin = async (username, password) => {
    setloading(true);
    try {
        const responce = await login(username, password);
      setUser(responce.user);
          return responce;  

    } catch (error) {
      throw error;
    } finally {
      setloading(false);
    }
  };

  let handleregister = async (username, email, password) => {
    setloading(true);
    try {
      const responce = await registration(username, email, password);
        setUser(responce.user);
        return responce;
    } catch (error) {
      throw error;
    } finally {
      setloading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setloading ,handlelogin,handleregister}}>
      {children}
    </AuthContext.Provider>
  );
};
