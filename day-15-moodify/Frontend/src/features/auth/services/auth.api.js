import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});
export const register = async ({ username, email, password }) => {
  const response = await api.post("/api/auth/register", {
    username,
    email,
    password,
  });
  return response.data;
};
export const login = async ({ username,email, password }) => {
  const response = await api.post("/api/auth/login", {
    username,
    email,
    password,
  });
  return response.data;
};


 export const getme = async () => {
  const response = await api.get("/api/auth/getme");
  return response.data;
}

export const logout = async () => {
  const response = await api.get("/api/auth/logout");
  return response.data;
}


