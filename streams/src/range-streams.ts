import { createServer } from "http";
import { createReadStream, stat } from "fs";
import { promisify } from "util";
import path from "path";

const fileInfo = promisify(stat);
const filePath = path.join(process.cwd(), "src", "the-universe.mp4");

export default createServer(async (req, res) => {
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

    createReadStream(filePath, { start: startByte, end: endByte }).pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": size,
      "Content-Type": "video/mp4",
    });

    createReadStream(filePath).pipe(res);
  }
}).listen(3000, () => {
  console.log("Server started on port 3000");
});
