"use strict";
// import { fork } from "child_process";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const process = [
//   fork("./dist/app.js", ["3001"]),
//   fork("./dist/app.js", ["3002"]),
//   fork("./dist/app.js", ["3003"]),
// ];
// console.log(`Forked ${process.length} processes`);
//npm i loadtest -g
const os_1 = __importDefault(require("os"));
const cluster_1 = __importDefault(require("cluster"));
const http_1 = __importDefault(require("http"));
const cpuCount = os_1.default.cpus().length;
// console.log("cpus===>", cpuCount.length);
if (cluster_1.default.isMaster) {
    console.log("Inside a master process", process.pid);
    for (let i = 0; i < cpuCount; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on("exit", (worker) => {
        console.log(`Worker process ${process.pid} just killed`);
        console.log(`${Object.keys(cluster_1.default.workers).length} are remaining.`);
        console.log("starting a new process worker");
        cluster_1.default.fork();
    });
}
else {
    console.log(`started a worker process at ${process.pid}.`);
    http_1.default
        .createServer((req, res) => {
        res.end(`Process:${process.pid}`);
        if (req.url === "/kill") {
            process.exit();
        }
        else if (req.url === "/") {
            console.log(`Serving requests from ${process.pid}`);
        }
    })
        .listen(3000);
}
