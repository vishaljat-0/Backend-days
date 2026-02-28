import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export let getfeed = async () => {
  try {
    const responce = await api.get("/api/posts/feed");
    return responce.data;
  } catch (error) {
    throw error;
  }
};
