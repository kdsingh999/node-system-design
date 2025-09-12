import { createWriteStream, createReadStream } from "node:fs";
import path from "node:path";
import { Readable, Transform } from "node:stream";
const resultCsv = path.join(process.cwd(), "src", "result.csv");
const file1 = path.join(process.cwd(), "src", "f1.csv");
const file2 = path.join(process.cwd(), "src", "f2.csv");
const file3 = path.join(process.cwd(), "src", "f3.csv");
function concatCSVFiles(resultFile, csvFiles) {
    return new Promise((resolve, reject) => {
        const resultStream = createWriteStream(resultFile);
        let firstFile = true;
        Readable.from(csvFiles)
            .pipe(myTransform(() => firstFile, () => {
            firstFile = false;
        }, resultStream))
            .on("error", reject)
            .on("finish", () => {
            resultStream.end();
            resolve(true);
        });
    });
}
function myTransform(getFirstFile, setFirstFile, resultStream) {
    return new Transform({
        transform(chunk, encoding, callback) {
            const src = createReadStream(chunk.toString(), { encoding: "utf-8" });
            let buffer = "";
            let isFirstLine = true;
            src.on("data", (data) => {
                buffer += data;
                let lines = buffer.split("\n");
                buffer = lines.pop() || ""; // keep last partial line
                lines.forEach((element, index) => {
                    if (index === 0 && !getFirstFile()) {
                        // skip header for all except first file
                        return;
                    }
                    if (element.trim()) {
                        resultStream.write(element + "\n"); // ✅ FIX: write element, not lines
                    }
                });
            });
            src.on("end", () => {
                setFirstFile(); // mark that we processed the first file
                callback();
            });
            src.on("error", (err) => callback(err));
        },
        objectMode: true,
    });
}
concatCSVFiles(resultCsv, [file1, file2, file3])
    .then(() => console.log("CSV File merged successfully"))
    .catch((err) => {
    console.log("Error in merging files", err);
});
