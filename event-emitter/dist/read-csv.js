"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRecordInCsv = searchRecordInCsv;
const events_1 = require("events");
const fs_1 = require("fs");
function searchRecordInCsv(files, searchTerm) {
    const emitter = new events_1.EventEmitter();
    for (const file of files) {
        (0, fs_1.readFile)(file, 'utf8', (error, data) => {
            if (error) {
                return emitter.emit("error", error);
            }
            emitter.emit("fileRead", data);
            const lines = data.trim().split("\n");
            for (let i = 1; i < lines.length; i++) {
                const row = lines[i].split(",");
                const found = row.some((col) => col.includes(searchTerm));
                if (found) {
                    emitter.emit("recordFound", file, row);
                }
            }
        });
    }
    return emitter;
}
