import { createReadStream, createWriteStream } from "fs";
import path from "path";
import split from "split";
const destinationPath = path.join(process.cwd(), "src/merging-streams", "merged.csv");
const sourcesPath1 = path.join(process.cwd(), "src/merging-streams", "file1.csv");
const sourcesPath2 = path.join(process.cwd(), "src/merging-streams", "file2.csv");
const sources = [sourcesPath1, sourcesPath2];
const destStream = createWriteStream(destinationPath);
let headerWritten = false;
let endCount = 0;
for (const source of sources) {
    const sourceStream = createReadStream(source, {
        encoding: "utf-8",
    });
    let isFirstLine = true;
    sourceStream.on("end", () => {
        if (++endCount == sources.length) {
            destStream.end();
            console.log(`${destinationPath} created successFully`);
        }
    });
    sourceStream
        .pipe(split((line) => {
        if (isFirstLine) {
            isFirstLine = false;
            if (!headerWritten) {
                headerWritten = true;
                return line + "\n";
            }
            else {
                return;
            }
        }
        else {
            return line + "\n";
        }
    }))
        .pipe(destStream, {
        end: false,
    });
}
