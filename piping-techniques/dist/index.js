/*
1. Parse CSV Data--> stream1
2. Filter Data --> Stream2
3. Transform Data Stream3
*/
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream";
import { createCombinedStream } from "./combine-stream.js";
import path from "node:path";
const filePath = path.join(process.cwd(), "src", "data.csv");
const resultPath = path.join(process.cwd(), "src", "test.json");
pipeline(createReadStream(filePath), createCombinedStream({
    minAge: 30,
}), createWriteStream(resultPath), (error) => {
    if (error) {
        console.log("Pipeline failed.", error);
    }
    else {
        console.log("Pipeline succeeded");
    }
});
