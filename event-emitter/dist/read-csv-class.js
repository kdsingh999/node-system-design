"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const fs_1 = require("fs");
class ReadEventEmitter extends events_1.EventEmitter {
    constructor(searchTerm) {
        super();
        this.searchTerm = searchTerm;
        this.files = [];
    }
    addFile(fileName) {
        this.files.push(fileName);
        return this;
    }
    search() {
        for (const file of this.files) {
            (0, fs_1.readFile)(file, "utf8", (error, data) => {
                if (error) {
                    return this.emit("error", error);
                }
                this.emit("fileRead", data);
                const lines = data.trim().split("\n");
                for (let i = 1; i < lines.length; i++) {
                    const row = lines[i].split(",");
                    const found = row.some((col) => col.includes(this.searchTerm));
                    if (found) {
                        this.emit("recordFound", file, row);
                    }
                }
            });
        }
        return this;
    }
}
exports.default = ReadEventEmitter;
