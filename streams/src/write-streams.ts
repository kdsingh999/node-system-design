import { createReadStream, createWriteStream } from "fs";
import path from "path";
const filePath = path.join(process.cwd(), "src", "the-universe.mp4");

const writeStreams = createWriteStream(
  path.join(process.cwd(), "src", "copy.mp4"),
  {
    highWaterMark: 162922,
  }
);
const readStream = createReadStream(filePath);

readStream.on("data", (chunk: any) => {
  const res = writeStreams.write(chunk);
  if (!res) {
    console.log("backpressure", chunk.length);
    readStream.pause();
  }
});
readStream.on("error", (error) => {
  console.error(error);
});

readStream.on("end", () => {
  writeStreams.end();
});

writeStreams.on("drain", () => {
  console.log("drained");
  readStream.resume();
});

writeStreams.on("close", () => {
  process.stdout.write("File copied.\n");
  //   console.log("File copied. \n");
});

export default readStream;
