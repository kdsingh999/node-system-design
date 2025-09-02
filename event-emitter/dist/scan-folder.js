"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanFolder = scanFolder;
const fs_1 = require("fs");
const path_1 = require("path");
const events_1 = require("events");
function scanFolder(folderPath, callback) {
    const emitter = new events_1.EventEmitter();
    let finalFileList = [];
    (0, fs_1.readdir)(folderPath, (err, items) => {
        if (err) {
            emitter.emit("error", err);
            if (callback)
                callback(err);
            return;
        }
        let pending = items.length || 0;
        if (!pending) {
            emitter.emit("done", []);
            if (callback) {
                callback(null, []);
            }
            return;
        }
        items.forEach((itemName) => {
            const fullPath = (0, path_1.join)(folderPath, itemName);
            (0, fs_1.stat)(fullPath, (errStat, stats) => {
                if (errStat) {
                    emitter.emit("error", errStat);
                }
                else {
                    if (stats.isFile()) {
                        // we found a file, let's report it
                        emitter.emit("file", fullPath);
                        finalFileList.push(fullPath);
                    }
                }
                if (!--pending) {
                    // scanning is done
                    emitter.emit("done", finalFileList);
                    if (callback)
                        callback(null, finalFileList);
                }
            });
        });
    });
    return emitter;
}
