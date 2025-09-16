import { createServer } from "node:net";
import { Writable } from "node:stream";
function demultiplexStream(socket, destination) {
    let currentChannel = null;
    let currentLength = null;
    socket.on("readable", () => {
        let chunk;
        while (true) {
            if (currentChannel === null) {
                chunk = socket.read(1);
                if (chunk == null) {
                    break;
                }
                currentChannel = chunk.readUInt8(0);
            }
            if (currentLength === 0) {
                chunk = socket.read(4);
                if (chunk == null) {
                    break;
                }
                currentLength = chunk.readUInt32BE(0);
            }
            chunk = socket.read(currentLength);
            console.log(`Received data on channel ${currentChannel}:${chunk.toString()}`);
            currentChannel = null;
            currentLength = null;
        }
    });
    socket.on("end", (err) => {
        destination.forEach((destination_) => destination_.end());
        console.log("Connection closed.");
    });
}
const numberStream = new Writable({
    write(chunk, encoding, callback) {
        const number = parseInt(chunk.toString(), 10);
        console.log(`Number received:${number}`);
        callback();
    },
});
const stringStream = new Writable({
    write(chunk, encoding, callback) {
        const message = chunk.toString();
        console.log(`String received:${message}`);
        callback();
    },
});
const server = createServer((socket) => {
    console.log("A client connected."),
        demultiplexStream(socket, [numberStream, stringStream]);
    socket.on("error", (err) => {
        console.error("Socket Error:", err);
    });
});
server.listen(9000, () => {
    console.log("Server listing on port 9000");
});
