import { create } from "domain";
import { createReadStream, createWriteStream } from "fs";
import path from "path";
const filePath = path.join(process.cwd(), "src", "the-universe.mp4");
// const localStorage = path.join(process.cwd(), "src", "copy.mp4");
const textPath = path.join(process.cwd(), "src", "test.txt");

// const readStreams = createReadStream(filePath);
const writeStreams = createWriteStream(textPath);

// readStreams.pipe(writeStreams).on("error", console.error);
process.stdin.pipe(writeStreams);
export default process;
