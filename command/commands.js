"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Create = exports.Exit = void 0;
var fs = require("fs");
var Exit = /** @class */ (function () {
    function Exit() {
    }
    Object.defineProperty(Exit.prototype, "name", {
        get: function () {
            return "exit";
        },
        enumerable: false,
        configurable: true
    });
    Exit.prototype.execute = function () {
        process.exit(0);
    };
    return Exit;
}());
exports.Exit = Exit;
var Create = /** @class */ (function () {
    function Create(fileName, fileContent) {
        this.fileName = fileName;
        this.fileContent = fileContent;
    }
    Object.defineProperty(Create.prototype, "name", {
        get: function () {
            return "create";
        },
        enumerable: false,
        configurable: true
    });
    Create.prototype.execute = function () {
        console.log("Creating file");
        fs.writeFileSync(this.fileName, this.fileContent);
    };
    return Create;
}());
exports.Create = Create;
