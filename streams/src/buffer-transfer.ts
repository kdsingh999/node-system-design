import fs from "fs";
import http from "http";
import path from "path";

const filePath = path.join(process.cwd(), "src", "the-universe.mp4");

export default function runServer() {
  http
    .createServer((req: any, res: any) => {
      fs.readFile(filePath, (error, data) => {
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
