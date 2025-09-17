import { fork } from "child_process";

const process = [
  fork("./dist/app.js", ["3001"]),
  fork("./dist/app.js", ["3002"]),
  fork("./dist/app.js", ["3003"]),
];

console.log(`Forked ${process.length} processes`);
