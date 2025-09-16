import fs, { read } from "fs";
import path from "path";
const filePath = path.join(process.cwd(), "src", "the-universe.mp4");

const readStream = fs.createReadStream(filePath);

readStream.on("data", (chunk: any) => {
  console.log(`Size of :${chunk.length}`);
});

readStream.on("end", () => {
  console.log("stream ended.");
});

readStream.on("error", (error) => {
  console.error(error);
});

readStream.pause();

process.stdin.on("data", (chunk) => {
  if (chunk.toString().trim() === "end") {
    readStream.resume();
  }
  console.log("chunk", chunk);
  //   readStream.read();
});

export default readStream;
