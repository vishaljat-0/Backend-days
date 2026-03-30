import axios from "axios";

const base = axios.create({
  withCredentials: true,
});

export const register = async ({ username, email, password }) => {
  const res = await base.post("/api/auth/register", {
    username,
    email,
    password,
  });
  return res.data;
};
export const login = async ({ email, password }) => {
  const res = await base.post("/api/auth/login", { email, password });
  return res.data;
};
export const getme = async () => {
  const res = await base.get("/api/auth/getme");
  return res.data;
};
