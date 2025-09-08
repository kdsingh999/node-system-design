"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const fs_1 = require("fs");
const util_1 = require("util");
const path_1 = __importDefault(require("path"));
const fileInfo = (0, util_1.promisify)(fs_1.stat);
const filePath = path_1.default.join(process.cwd(), "src", "the-universe.mp4");
exports.default = (0, http_1.createServer)(async (req, res) => {
    const { size } = await fileInfo(filePath);
    const range = req.headers.range;
    console.log("Range request:", range);
    if (range) {
        // Example: "bytes=123-789"
        let [start, end] = range.replace(/bytes=/, "").split("-");
        let startByte = parseInt(start, 10);
        let endByte = end ? parseInt(end, 10) : size - 1;
        res.writeHead(206, {
            "Content-Type": "video/mp4",
            "Content-Range": `bytes ${startByte}-${endByte}/${size}`,
            "Accept-Ranges": "bytes",
            "Content-Length": endByte - startByte + 1,
        });
        (0, fs_1.createReadStream)(filePath, { start: startByte, end: endByte }).pipe(res);
    }
    else {
        res.writeHead(200, {
            "Content-Length": size,
            "Content-Type": "video/mp4",
        });
        (0, fs_1.createReadStream)(filePath).pipe(res);
    }
}).listen(3000, () => {
    console.log("Server started on port 3000");
});
