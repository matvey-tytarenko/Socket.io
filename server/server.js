const http = require("http");
const app = require("./index");
const { Server } = require("socket.io");
require("dotenv").config();

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  try {
    console.log(`Server has been started on: http://localhost:${PORT}`);
  } catch (error) {
    console.error(`Server Error: ${error}`);
  }
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
    try {
        console.log(`User Connected ${socket.id}`);
        socket.on("send_message", (data) => {
            socket.broadcast.emit("recive_message", data)
        });
    } catch (error) {
        console.error(`User Connection Error: ${error}`);
    }
})