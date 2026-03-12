import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const uploadsong = async ({ mood }) => {
  const responce = await api.get(`/api/song?mood=${mood}`);
  console.log(responce);
  return responce.data;
};
