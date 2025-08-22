"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
//const fileName = fileURLToPath(import.meta.url);
fs.readFile("./event-loop/index.text", "utf-8", function (err, data) {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    setTimeout(function () {
        console.log("File Content in setTimeout:", data);
    }, 0);
    setImmediate(function () {
        console.log("File Content in setImmediate:", data);
    });
});
