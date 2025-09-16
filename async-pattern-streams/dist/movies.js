// index.ts
import { pipeline } from "node:stream";
import { createReadStream, createWriteStream } from "node:fs";
import parallelTransform from "parallel-transform";
import split from "split";
import path from "node:path";
const filePath = path.join(process.cwd(), "src", "movies.csv");
const locationPath = path.join(process.cwd(), "src", "new-result.txt");
const PARALLELISM = 2;
pipeline(createReadStream(filePath), split(), parallelTransform(PARALLELISM, (line, callback) => {
    if (!line.trim())
        return callback();
    try {
        const [title, ratingStr, posterPath] = line.split(",");
        const rating = parseFloat(ratingStr);
        if (rating >= 5) {
            callback(null, `Title:${title}, Rating:${rating}, Poster:${posterPath}\n`);
        }
        else {
            callback();
        }
    }
    catch (error) {
        console.error(`Error processing line:`, error);
    }
}), createWriteStream(locationPath), (error) => {
    if (error) {
        console.error(`Pipeline failed:`, error);
    }
    else {
        console.log(`All movies have been processed ✅`);
    }
});
