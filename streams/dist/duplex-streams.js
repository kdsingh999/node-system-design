"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const stream_1 = require("stream");
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.join(process.cwd(), "src", "the-universe.mp4");
const localStorage = path_1.default.join(process.cwd(), "src", "copy.mp4");
const readStream = (0, fs_1.createReadStream)(filePath);
const writeStream = (0, fs_1.createWriteStream)(localStorage);
const reportStream = new stream_1.PassThrough();
class Throttle extends stream_1.Duplex {
    constructor(time) {
        super();
        this.time = time;
    }
    _write(chunk, encoding, callback) {
        this.push(chunk);
        setTimeout(callback, this.time);
    }
    _read(size) { }
    _final(callback) {
        this.push(null);
    }
}
const throttle = new Throttle(20);
let size = 0;
reportStream.on("data", (chunk) => {
    size += chunk.length;
    console.log("Bytes of data so far: ", size);
});
readStream.pipe(throttle).pipe(reportStream).pipe(writeStream);
exports.default = readStream;
