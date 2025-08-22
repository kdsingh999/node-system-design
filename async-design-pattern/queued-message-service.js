"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var QueuedMessageService = /** @class */ (function (_super) {
    __extends(QueuedMessageService, _super);
    function QueuedMessageService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.authenticated = false;
        _this.commandQueue = [];
        return _this;
    }
    QueuedMessageService.prototype.sendMessage = function (message) {
        var _this = this;
        if (!this.authenticated) {
            console.log("Requested Queued: ".concat(message));
            return new Promise(function (resolve, reject) {
                var command = function () {
                    var _a;
                    (_a = _this.sendMessage(message)) === null || _a === void 0 ? void 0 : _a.then(resolve, reject);
                };
                _this.commandQueue.push(command);
            });
        }
        console.log("Message sent: ".concat(message));
    };
    QueuedMessageService.prototype.authenticate = function () {
        var _this = this;
        setTimeout(function () {
            _this.authenticated = true;
            _this.emit("authenticated");
            _this.commandQueue.forEach(function (command) { return command(); });
            _this.commandQueue = [];
        }, 1000);
    };
    return QueuedMessageService;
}(events_1.EventEmitter));
var queuedMessageService = new QueuedMessageService();
exports.default = queuedMessageService;
