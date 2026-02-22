import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});
export let registration = async (username, email, password) => {
  try {
    const responce = await api.post(
      "/api/auth/register",
      {
        username: username,
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      },
    );
    return responce.data;
  } catch (error) {
    throw  error;
  }
};

export let login = async (username,  password) => {
  try {
    const responce = await api.post(
      "/api/auth/login",
      {
        username: username,
        password: password,
      },
      {
        withCredentials: true,
      },
    );
    return responce.data;
  } catch (error) {
    throw error
  }
};

export let getme = async () => {
  try {
    const responce = await api.get("/get-me");
    return responce.data;
  } catch (error) {
    throw  error;
  }
};
