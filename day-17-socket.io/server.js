import app from "./src/app.js";
import { Server } from "socket.io";
import http from "http";
import { Socket } from "dgram";
import { log } from "console";

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (Socket) => {
  console.log("user comminted");



  Socket.on("message",(msg)=>{
    console.log("user fired a meesgae event with data: " + msg);
    io.emit("abc", msg);
  })
});

server.listen(3000, () => {
  console.log("Socket.io server is running ");
});
