import { Server } from "socket.io";


let io;
export const initserver = (httpserver) => {
  io = new Server(httpserver, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });
  console.log("Socket.io server is RUNNING")


  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
      console.log("a user disconnected");
    });
  });
};

export function getIO() {
    if (!io) {
        throw new Error("Socket.io not initialized")
    }

    return io
}