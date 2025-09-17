"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const port = parseInt(process.argv[2] || "3000");
const articles = [
    { title: "Understanding TypeScript Interfaces" },
    { title: "A Guide to Node.js Streams" },
    { title: "Exploring Modern JavaScript Features" },
    { title: "Effective Stress Management Techniques" },
    { title: "How to Learn German by Yourself" },
    { title: "Building Scalable Systems with Node.js" },
    { title: "Database Optimization Strategies" },
    { title: "Mastering Real-Time Communication" },
    { title: "Interview Preparation for Backend Developers" },
    { title: "Implementing File Streaming with AWS S3" },
];
const server = http_1.default.createServer((req, res) => {
    const randomIndex = Math.floor(Math.random() * articles.length);
    const joke = articles[randomIndex];
    const responsePayload = JSON.stringify({
        joke: joke.title,
        processID: process.pid,
    });
    console.log(`A joke from ${process.pid}: ${joke.title}`);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(responsePayload);
});
server.listen(3000, () => {
    console.log(`Joke server is running on port 3000`);
});
