"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.join(process.cwd(), "src", "the-universe.mp4");
const writeStreams = (0, fs_1.createWriteStream)(path_1.default.join(process.cwd(), "src", "copy.mp4"), {
    highWaterMark: 162922,
});
const readStream = (0, fs_1.createReadStream)(filePath);
readStream.on("data", (chunk) => {
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
exports.default = readStream;
