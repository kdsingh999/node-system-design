import { createServer } from "http";
import { createReadStream, createWriteStream, stat } from "fs";
import { promisify } from "util";
import path from "path";
import multiparty from "multiparty";
import { PassThrough } from "stream";

const fileInfo = promisify(stat);
const filePath = path.join(process.cwd(), "src", "the-universe.mp4");

const respondWithVideoStream = async (req: any, res: any) => {
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
};

export default createServer((req, res) => {
  if (req.method == "POST") {
    const form = new multiparty.Form();
    form.on("part", (part) => {
      const srcPath = path.join(process.cwd(), "src", `${part.filename}`);
      const distPath = path.join(process.cwd(), "dist", `${part.filename}`);
      const srcStream = createWriteStream(srcPath);
      const distStream = createWriteStream(distPath);

      const tee = new PassThrough();
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
  } else if (req.url === "/video") {
    respondWithVideoStream(req, res);
  } else {
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
