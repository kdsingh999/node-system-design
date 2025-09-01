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
const fs_1 = __importDefault(require("fs"));
const executeTasksInSequence = () => {
    console.log("🚀 Starting the process...");
    setTimeout(() => {
        console.log("⏳ Waiting for the first timeout...");
        setTimeout(() => {
            console.log("⏳ Waiting a bit more...");
            fs_1.default.writeFile("test.txt", "Test File...", (error) => {
                if (error) {
                    console.error("❌ Error writing file:", error);
                }
                else {
                    console.log("✅ test.txt has been created");
                    setTimeout(() => {
                        fs_1.default.unlink("test.txt", (error) => {
                            if (error) {
                                console.error("❌ Error removing file:", error);
                            }
                            else {
                                console.log("🗑️ test.txt has been removed");
                                console.log("🏁 Sequential execution complete");
                            }
                        });
                    }, 3000);
                }
            });
        }, 2000);
    }, 1000);
};
executeTasksInSequence();
