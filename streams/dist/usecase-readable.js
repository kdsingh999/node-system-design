"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.join(process.cwd(), "src", "the-universe.mp4");
const readStream = fs_1.default.createReadStream(filePath);
readStream.on("data", (chunk) => {
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
exports.default = readStream;
