"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Receiver = /** @class */ (function () {
    function Receiver() {
    }
    Receiver.prototype.execute = function (command) {
        console.log("Executing command");
        command.execute();
    };
    return Receiver;
}());
exports.default = new Receiver();
