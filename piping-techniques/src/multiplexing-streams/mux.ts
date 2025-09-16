import { Readable } from "node:stream";
import { connect } from "node:net";

function createNumberStream() {
  let count = 0;
  return new Readable({
    objectMode: true,
    read() {
      if (count < 5) {
        return this.push(count);
        count++;
      } else {
        this.push(null);
      }
    },
  });
}

function createStringStream() {
  const messages = ["Hello", "Human", "This Term", "People", "Advanced"];
  let index = 0;
  return new Readable({
    objectMode: true,
    read() {
      if (index < messages.length) {
        this.push(messages[index]);
        index++;
      } else {
        this.push(null);
      }
    },
  });
}

function multiplexStream(streams: any, destination: any) {
  let activeStreams = streams.length;

  streams.forEach((stream: any, index: number) => {
    stream.on("data", (chunk: any) => {
      const dataBuffer = Buffer.from(chunk.toString());
      const header = Buffer.alloc(5);
      header.writeUInt8(index, 0);
      header.writeUint32BE(dataBuffer.length, 1);
      destination.write(Buffer.concat([header, dataBuffer]));
      console.log(`Sent data on channel ${index}:${chunk} `);
    });
    stream.on("end", () => {
      activeStreams -= 1;
      if (activeStreams == 0) {
        destination.end();
        console.log("All streams ended.Connection closed");
      }
    });
  });
}

const socket = connect(9000, "localhost", () => {
  console.log("Connected to server");
  const numberStream = createNumberStream();
  const stringStream = createStringStream();
  multiplexStream([numberStream, stringStream], socket);
});

socket.on("error", (err: any) => {
  console.error("Socket error:", err);
});
