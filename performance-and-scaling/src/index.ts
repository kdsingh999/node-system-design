// import { fork } from "child_process";

// const process = [
//   fork("./dist/app.js", ["3001"]),
//   fork("./dist/app.js", ["3002"]),
//   fork("./dist/app.js", ["3003"]),
// ];

// console.log(`Forked ${process.length} processes`);
//npm i loadtest -g

import os from "os";
import cluster from "cluster";
import http from "http";

const cpuCount: number = os.cpus().length;
// console.log("cpus===>", cpuCount.length);

if (cluster.isMaster) {
  console.log("Inside a master process", process.pid);
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker: any) => {
    console.log(`Worker process ${process.pid} just killed`);
    console.log(`${Object.keys(cluster.workers as any).length} are remaining.`);
    console.log("starting a new process worker");
    cluster.fork();
  });
} else {
  console.log(`started a worker process at ${process.pid}.`);
  http
    .createServer((req, res) => {
      res.end(`Process:${process.pid}`);

      if (req.url === "/kill") {
        process.exit();
      } else if (req.url === "/") {
        console.log(`Serving requests from ${process.pid}`);
      }
    })
    .listen(3000);
}
