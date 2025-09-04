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
        res.writeHead(200, { "Content-Type": "video/mp4" });
        fs_1.default.createReadStream(filePath).pipe(res).on("error", console.error);
    })
        .listen(3000, () => {
        console.log(`Stream server running on http:localhost:3000`);
    });
}
