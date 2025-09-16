"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_net_1 = __importDefault(require("node:net"));
const node_stream_1 = require("node:stream");
function log(message) {
    process.stdout.write(`\r${message}`);
}
const myWritable = new node_stream_1.Writable({
    write(chunk, encoding, callback) {
        //process the chunk
        const data = JSON.parse(chunk);
        const id = data.id;
        const message = data.message;
        if (message) {
            log(`${id} says:${message}`);
        }
        else {
            log(`My ID :${id}\n`);
        }
        log("Type something:");
        callback(null, chunk);
    },
});
process.stdin.pipe(node_net_1.default.connect(3000)).pipe(myWritable);
