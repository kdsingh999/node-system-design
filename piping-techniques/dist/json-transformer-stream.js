import { Transform } from "node:stream";
export function createJSONTransformerStream() {
    return new Transform({
        writableObjectMode: true,
        readableObjectMode: true,
        transform(chunk, encoding, callback) {
            console.log("Type", typeof chunk);
            const jsonString = JSON.stringify(chunk).concat("\n");
            this.push(jsonString);
            callback();
        },
    });
}
