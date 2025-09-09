"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const fs_1 = require("fs");
const util_1 = require("util");
const path_1 = __importDefault(require("path"));
const multiparty_1 = __importDefault(require("multiparty"));
const stream_1 = require("stream");
const fileInfo = (0, util_1.promisify)(fs_1.stat);
const filePath = path_1.default.join(process.cwd(), "src", "the-universe.mp4");
const respondWithVideoStream = async (req, res) => {
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
};
exports.default = (0, http_1.createServer)((req, res) => {
    if (req.method == "POST") {
        const form = new multiparty_1.default.Form();
        form.on("part", (part) => {
            const srcPath = path_1.default.join(process.cwd(), "src", `${part.filename}`);
            const distPath = path_1.default.join(process.cwd(), "dist", `${part.filename}`);
            const srcStream = (0, fs_1.createWriteStream)(srcPath);
            const distStream = (0, fs_1.createWriteStream)(distPath);
            const tee = new stream_1.PassThrough();
            part.pipe(tee);
            tee.pipe(srcStream);
            tee.pipe(distStream);
            srcStream.on("close", () => {
                res.writeHead(200, {
                    "Content-Type": "text/html",
                });
                res.end(`<h1>${part.filename} File was uploaded.</h1>`);
            });
            distStream.on("close", () => {
                res.writeHead(200, {
                    "Content-Type": "text/html",
                });
                res.end(`<h1>${part.filename} File was uploaded.</h1>`);
            });
        });
        form.parse(req);
        // req.pipe(res);
        // req.pipe(createWriteStream(srcPath));
        // req.pipe(createWriteStream(distPath));
    }
    else if (req.url === "/video") {
        respondWithVideoStream(req, res);
    }
    else {
        res.writeHead(200, {
            "Content-Type": "text/html",
        });
        res.end(`
        <form enctype="multipart/form-data" method="POST" action="/">
        <input type="file" name="upload-file" />
        <button>Submit</button>
        </form>
        `);
    }
}).listen(3000, () => {
    console.log("Server started on port 3000");
});
