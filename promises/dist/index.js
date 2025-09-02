"use strict";
// var wait = (sec: any) =>
//   new Promise((resolves: any, reject: any) => {
//     if (typeof sec != "number") {
//       reject(new Error("Sec must be a number"));
//     }
//     setTimeout(
//       () => resolves("I have waited enough,Lets Finish now"),
//       sec * 1000
//     );
//   });
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// wait("1")
//   .then((message: any) => {
//     console.log(message);
//   })
//   .then(() => 55)
//   .then((number: number) => console.log(`Number is handled ${number}`))
//   .catch((error: any) => {
//     console.log(`Error got in catch block:${error.message}`);
//   });
// import { promisify } from "util";
// import fs from "fs";
// var writeFile = promisify(fs.writeFile);
// writeFile("test.txt", "This is test file to write")
//   .then(() => console.log("writing file successfully"))
//   .catch((error) => {
//     console.log(`This is error:${error.message}`);
//   });
// var wait = (sec: any, callback: Function) => {
//   if (typeof sec != "number") {
//     callback(new Error(`Sec must be number`));
//   } else {
//     setTimeout(() => callback(null, `this ${sec} second/finished`), sec * 1000);
//   }
// };
// var promisifiedWait = promisify(wait);
// promisifiedWait("4")
//   .then(console.log)
//   .catch((error: any) => console.log(`Error is ${error.message}`));
// console.log("first finished");
//<---------------Sequential Execution---------------->
// import fs from "fs";
// import { promisify } from "util";
// var writeFile = promisify(fs.writeFile);
// var unlinkFile = promisify(fs.unlink);
// var readdir = promisify(fs.readdir);
// var wait = (sec: number) =>
//   new Promise((resolves) => {
//     setTimeout(resolves, sec * 1000);
//   });
// async function test() {
//   var files = await readdir(__dirname);
//   console.log(`Reading of files in done at`, files);
// }
// test();
// const executeTasksInSequence = async () => {
//   try {
//     console.log("🚀 Starting the process...");
//     await wait(1);
//     console.log("⏳ Waiting for the first timeout...");
//     await wait(2);
//     console.log("⏳ Waiting a bit more...");
//     await writeFile("test.txt", "Test File...");
//     console.log("✅ test.txt has been created");
//     await wait(3);
//     await unlinkFile("test.txt");
//     console.log("🗑️ test.txt has been removed");
//   } catch (error) {
//     console.error(error);
//   }
// };
// executeTasksInSequence();
// const executeTasksInSequence = () =>
//   Promise.resolve()
//     .then(() => console.log("🚀 Starting the process..."))
//     .then(() => {
//       wait(1);
//     })
//     .then(() => "⏳ Waiting for the first timeout...")
//     .then(console.log)
//     .then(() => wait(2))
//     .then(() => "⏳ Waiting a bit more...")
//     .then(console.log)
//     .then(() => writeFile("test.txt", "Test File..."))
//     .then(() => "✅ test.txt has been created")
//     .then(console.log)
//     .then(() => wait(3))
//     .then(() => unlinkFile("test.txt"))
//     .then(() => "🗑️ test.txt has been removed")
//     .then(() => console.log)
//     .catch((error) => console.error(error));
// executeTasksInSequence();
// const executeTasksInSequence = () => {
//   console.log("🚀 Starting the process...");
//   setTimeout(() => {
//     console.log("⏳ Waiting for the first timeout...");
//     setTimeout(() => {
//       console.log("⏳ Waiting a bit more...");
//       fs.writeFile("test.txt", "Test File...", (error) => {
//         if (error) {
//           console.error("❌ Error writing file:", error);
//         } else {
//           console.log("✅ test.txt has been created");
//           setTimeout(() => {
//             fs.unlink("test.txt", (error) => {
//               if (error) {
//                 console.error("❌ Error removing file:", error);
//               } else {
//                 console.log("🗑️ test.txt has been removed");
//                 console.log("🏁 Sequential execution complete");
//               }
//             });
//           }, 3000);
//         }
//       });
//     }, 2000);
//   }, 1000);
// };
// executeTasksInSequence();
//<----------- Parallel execution-------->
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const path_1 = __importDefault(require("path"));
const log_update_1 = __importDefault(require("log-update"));
const srcPath = path_1.default.join(process.cwd(), "src");
const distPath = path_1.default.join(process.cwd(), "dist");
var writeFile = (0, util_1.promisify)(fs_1.default.writeFile);
var unlinkFile = (0, util_1.promisify)(fs_1.default.unlink);
var readdir = (0, util_1.promisify)(fs_1.default.readdir);
var wait = (sec) => new Promise((resolves) => {
    setTimeout(resolves, sec * 1000);
});
// console.log(process.cwd(), __dirname);
// Promise.all([
//   writeFile(path.join(srcPath, "test.md"), "This is test data"),
//   writeFile(path.join(srcPath, "test.txt"), "This is test data"),
//   writeFile(path.join(srcPath, "test.json"), "This is test data"),
//   writeFile(path.join(srcPath, "test.docx"), "This is test data"),
//   writeFile(path.join(distPath, "test.md"), "This is test data"),
//   writeFile(path.join(distPath, "test.txt"), "This is test data"),
//   writeFile(path.join(distPath, "test.json"), "This is test data"),
//   writeFile(path.join(distPath, "test.docx"), "This is test data"),
// ])
//   .then(() => readdir(__dirname))
//   .then(console.log);
// Promise.all([wait(9), wait(8), wait(7), wait(2)])
//   .then(() => readdir(__dirname))
//   .then(console.log);
// Promise.race([wait(9), wait(8), wait(7), wait(2)])
//   .then(() => readdir(__dirname))
//   .then(console.log);
//<------------------------Concurrent Operations---------------->
const toSandClock = () => "⌛";
var wait = (sec) => {
    return new Promise((resolves) => {
        setTimeout(resolves, sec * 1000);
    });
};
var tasks = [
    wait(6),
    wait(7),
    wait(9),
    wait(8),
    wait(3),
    wait(5),
    wait(2),
    wait(3),
    wait(6),
    wait(3),
];
class PromiseQueue {
    constructor(promises = [], concurrentCount = 2) {
        this.concurrent = concurrentCount;
        this.total = promises.length;
        this.todo = promises;
        this.running = [];
        this.done = [];
    }
    get runNewTask() {
        return this.running.length < this.concurrent && this.todo.length;
    }
    logTask() {
        const { todo, running, done } = this;
        (0, log_update_1.default)(`
      todo:[${todo.map(toSandClock)}],
      running:[${running.map(toSandClock)}],
      done:[${done.map(toSandClock)}],
      `);
    }
    run() {
        while (this.runNewTask) {
            const promise = this.todo.shift();
            this.running.push(promise);
            this.logTask();
            promise
                .then(() => {
                this.done.push(promise);
            })
                .catch((error) => {
                console.log(error);
            })
                .finally(() => {
                this.running = this.running.filter((p) => p != promise);
                this.logTask();
                this.run();
            });
        }
    }
}
var tasksQueue = new PromiseQueue(tasks, 2);
tasksQueue.run();
