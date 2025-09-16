import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
const filePath = path.join(process.cwd(), "src", "10GB.bin");
const resultPath = path.join(process.cwd(), "src", "10GB.mp4");
const CHUNK_SIZE = 1024 * 1024;
await pipeline(createReadStream(filePath, { highWaterMark: CHUNK_SIZE }), createWriteStream(resultPath, { highWaterMark: CHUNK_SIZE }));
