"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = runServer;
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.join(process.cwd(), "src", "the-universe.mp4");
function runServer() {
    http_1.default
        .createServer((req, res) => {
        fs_1.default.readFile(filePath, (error, data) => {
            if (error) {
                console.log("Oops:", error);
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Internal Server Error");
                return;
            }
            res.writeHead(200, { "Content-Type": "video/mp4" });
            res.end(data);
        });
    })
        .listen(3000, () => {
        console.log(`Buffer server running on http:localhost:3000`);
    });
}
