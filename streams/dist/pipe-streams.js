"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.join(process.cwd(), "src", "the-universe.mp4");
// const localStorage = path.join(process.cwd(), "src", "copy.mp4");
const textPath = path_1.default.join(process.cwd(), "src", "test.txt");
// const readStreams = createReadStream(filePath);
const writeStreams = (0, fs_1.createWriteStream)(textPath);
// readStreams.pipe(writeStreams).on("error", console.error);
process.stdin.pipe(writeStreams);
exports.default = process;
