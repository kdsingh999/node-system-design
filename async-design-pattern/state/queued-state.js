"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueuedState = void 0;
var FUNCTIONS_NEED_AUTH = ["sendMessage"];
var QueuedState = /** @class */ (function () {
    function QueuedState(service) {
        var _this = this;
        this.service = service;
        this.commandQueue = [];
        FUNCTIONS_NEED_AUTH.forEach(function (functionName) {
            _this[functionName] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                console.log("Command Queued: ", functionName, args);
                return new Promise(function (resolve, reject) {
                    var command = function () {
                        var _a;
                        var _b;
                        (_b = (_a = _this.service)[functionName].apply(_a, args)) === null || _b === void 0 ? void 0 : _b.then(resolve, reject);
                    };
                    _this.commandQueue.push(command);
                });
            };
        });
    }
    QueuedState.prototype.disable = function () {
        this.commandQueue.forEach(function (command) { return command(); });
        this.commandQueue = [];
    };
    return QueuedState;
}());
exports.QueuedState = QueuedState;
