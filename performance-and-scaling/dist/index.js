"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const process = [
    (0, child_process_1.fork)("./dist/app.js", ["3001"]),
    (0, child_process_1.fork)("./dist/app.js", ["3002"]),
    (0, child_process_1.fork)("./dist/app.js", ["3003"]),
];
console.log(`Forked ${process.length} processes`);
