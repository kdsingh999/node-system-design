"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_net_1 = __importDefault(require("node:net"));
const node_crypto_1 = require("node:crypto");
const node_stream_1 = require("node:stream");
const clients = new Map();
const broadcastToClient = (senderSocketId, data) => {
    [...clients.values()]
        .filter((clientSocket) => clientSocket.id !== senderSocketId)
        .forEach((clientSocket) => clientSocket.write(data));
};
const broadcastingViaStreaming = (socket) => {
    return new node_stream_1.Writable({
        write(chunk, encoding, callback) {
            const data = JSON.stringify({
                message: chunk.toString(),
                id: socket.id.slice(0, 5),
            });
            broadcastToClient(socket.id, data);
            callback(null, chunk);
        },
    });
};
const server = node_net_1.default.createServer((socket) => {
    socket.pipe(broadcastingViaStreaming(socket));
});
server.listen(3000, () => console.log("Server is listening on port 3000"));
server.on("connection", (socket) => {
    socket.id = (0, node_crypto_1.randomUUID)();
    console.log(`A new connection with ID ${socket.id} !`);
    clients.set(socket.id, socket);
    socket.write(JSON.stringify({
        id: socket.id.slice(0, 5),
    }));
    server.on("close", () => {
        console.log(`Connection ${socket.id} disconnected`);
        clients.delete(socket.id);
    });
});
