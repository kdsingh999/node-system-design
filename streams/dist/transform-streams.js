"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = executeTransForm;
const stream_1 = require("stream");
class ChangeText extends stream_1.Transform {
    constructor(char) {
        super();
        this.replaceCharacter = char;
    }
    _transform(chunk, encoding, callback) {
        const transformedChunk = chunk
            .toString()
            .replace(/[a-zA-Z0-9]/g, this.replaceCharacter);
        this.push(transformedChunk);
        callback();
    }
    _flush(callback) {
        this.push("more chunk of data is being passed...");
        callback();
    }
}
function executeTransForm() {
    var smileStream = new ChangeText("😂");
    process.stdin.pipe(smileStream).pipe(process.stdout);
}
