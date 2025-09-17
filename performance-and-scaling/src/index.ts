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
    
} else {
  console.log(`started a worker process at ${process.pid}.`);
  http
    .createServer((req, res) => {
      const msg = `This is a worker process with pidid:${process.pid}`;
      console.log(msg);
      res.end(msg);
    })
    .listen(3000);
}
