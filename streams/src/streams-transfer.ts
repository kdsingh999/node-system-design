import fs from "fs";
import http from "http";
import path from "path";

const filePath = path.join(process.cwd(), "src", "the-universe.mp4");

export default function runServer() {
  http
    .createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "video/mp4" });
      fs.createReadStream(filePath).pipe(res).on("error", console.error);
    })
    .listen(3000, () => {
      console.log(`Stream server running on http:localhost:3000`);
    });
}
