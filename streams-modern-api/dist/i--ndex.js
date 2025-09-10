import path from "path";
import { pipeline } from "node:stream/promises";
import { setTimeout } from "node:timers/promises";
import { appendFileSync } from "node:fs";
const filePath = path.join(process.cwd(), "src", "test.txt");
async function* myReadable() {
    yield Buffer.from("I am ");
    await setTimeout(1000);
    yield Buffer.from("KD Coding");
}
async function* myTransform(stream) {
    for await (const chunk of stream) {
        yield chunk.toString().toUpperCase();
    }
}
async function* myWritable(stream) {
    for await (const chunk of stream) {
        console.log(`Writable:`, chunk);
        appendFileSync(filePath, chunk);
    }
}
async function* myDuplex(stream) {
    let bytes = 0;
    const finalMessage = [];
    for await (const chunk of stream) {
        console.log(`Duplex:`, chunk);
        bytes += chunk.length;
        finalMessage.push(chunk);
    }
    yield `The final message is:${finalMessage.join()}`;
    yield `Total bytes:${bytes}`;
}
await pipeline(myReadable, myTransform, myDuplex, myWritable);
