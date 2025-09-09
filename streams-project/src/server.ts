import net from "node:net";
import { randomUUID } from "node:crypto";
import { Writable } from "node:stream";
import { write } from "node:fs";

const clients: Map<string, string> = new Map();

const broadcastToClient = (senderSocketId: any, data: any) => {
  [...clients.values()]
    .filter((clientSocket: any) => clientSocket.id !== senderSocketId)
    .forEach((clientSocket: any) => clientSocket.write(data));
};

const broadcastingViaStreaming = (socket: any) => {
  return new Writable({
    write(chunk: any, encoding: any, callback: Function) {
      const data = JSON.stringify({
        message: chunk.toString(),
        id: socket.id.slice(0, 5),
      });
      broadcastToClient(socket.id, data);
      callback(null, chunk);
    },
  });
};

const server = net.createServer((socket) => {
  socket.pipe(broadcastingViaStreaming(socket));
});

server.listen(3000, () => console.log("Server is listening on port 3000"));

server.on("connection", (socket: any) => {
  socket.id = randomUUID();
  console.log(`A new connection with ID ${socket.id} !`);
  clients.set(socket.id, socket);
  socket.write(
    JSON.stringify({
      id: socket.id.slice(0, 5),
    })
  );
  server.on("close", () => {
    console.log(`Connection ${socket.id} disconnected`);
    clients.delete(socket.id);
  });
});
