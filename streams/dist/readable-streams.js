"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = readableStreams;
const stream_1 = require("stream");
class ArrayStream extends stream_1.Readable {
    constructor(rivers = [], ...rest) {
        super(...rest);
        this.rivers = rivers;
        this.index = 0;
    }
    _read() {
        if (this.index <= this.rivers.length) {
            const chunk = {
                data: this.rivers[this.index],
                index: this.index,
            };
            this.push(chunk);
            this.index += 1;
        }
        else {
            this.push(null);
        }
    }
}
const rivers = ["Amazon", "Nile", "Ganga", "Yamuna", "Ghaghra", "Rapti"];
function readableStreams() {
    const riverStream = new ArrayStream(rivers, {
        objectMode: true,
    });
    riverStream.on("data", (chunk) => {
        console.log(chunk);
    });
    riverStream.on("end", () => console.log("Stream ended."));
}
