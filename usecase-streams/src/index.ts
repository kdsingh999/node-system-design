import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import path from "node:path";
import { Readable, Transform } from "node:stream";
import { WritableStream, TransformStream } from "node:stream/web";
const filePath = path.join(process.cwd(), "src", "imd_movies.csv");
import csvtojson from "csvtojson";

const PORT = 5001;

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Method": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Allow-Credentials": "true",
};

function createAbortController(req: any) {
  const abortController = new AbortController();
  req.once("close", () => {
    console.log("Client Disconnected,aborting stream...");
    abortController.abort();
  });

  return abortController;
}

function createTransformStream() {
  return new TransformStream({
    transform(chunk: any, ctrl: any) {
      try {
        const rawData = JSON.parse(new TextDecoder().decode(chunk));
        const selectedData = JSON.stringify({
          title: rawData.title,
          vote: rawData.vote_average,
          poster: rawData.poster_path,
        });
        console.log(rawData);
        ctrl.enqueue(selectedData.concat("\n"));
      } catch (error) {
        console.log("Error processing chunk:", error);
      }
    },
  });
}

function createWritableStream(res: any) {
  return new WritableStream({
    write(chunk) {
      res.write(chunk);
    },
    close() {
      res.end();
    },
  });
}

const handleRequest = async (req: any, res: any) => {
  res.writeHead(200, headers);
  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  const abortController = new AbortController();

  try {
    await Readable.toWeb(createReadStream(filePath))
      .pipeThrough(Transform.toWeb(csvtojson()))
      .pipeThrough(createTransformStream())
      .pipeTo(createWritableStream(res), { signal: abortController.signal });
  } catch (error: any) {
    if (error["name"] === "AbortError") {
      console.log("stream ended");
    } else {
      console.log("Unexpected Error");
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  }
  // res.end("UP");
};

createServer(handleRequest).listen(PORT, () => {
  console.log(`server is started on http;//localhost:${PORT}`);
});
