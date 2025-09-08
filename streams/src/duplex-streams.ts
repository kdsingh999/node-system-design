import { createReadStream, createWriteStream } from "fs";
import { PassThrough, Duplex } from "stream";
import path from "path";
const filePath = path.join(process.cwd(), "src", "the-universe.mp4");
const localStorage = path.join(process.cwd(), "src", "copy.mp4");

const readStream = createReadStream(filePath);
const writeStream = createWriteStream(localStorage);
const reportStream = new PassThrough();

class Throttle extends Duplex {
  time: number;
  constructor(time: number) {
    super();
    this.time = time;
  }

  _write(
    chunk: any,
    encoding: BufferEncoding,
    callback: (error?: Error | null) => void
  ): void {
    this.push(chunk);
    setTimeout(callback, this.time);
  }

  _read(size: number): void {}

  _final(callback: (error?: Error | null) => void): void {
    this.push(null);
  }
}

const throttle = new Throttle(20);

let size = 0;
reportStream.on("data", (chunk: any) => {
  size += chunk.length;
  console.log("Bytes of data so far: ", size);
});

readStream.pipe(throttle).pipe(reportStream).pipe(writeStream);
export default readStream;
