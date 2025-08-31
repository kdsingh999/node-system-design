"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function readConfig(filePath, options, callback) {
    (0, fs_1.readFile)(filePath, 'utf8', function (err, data) {
        if (err) {
            return callback(err);
        }
        callback(data);
    });
}
