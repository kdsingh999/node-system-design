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
exports.statefulMessageService = void 0;
var events_1 = require("events");
var queued_state_1 = require("./queued-state");
var ready_state_1 = require("./ready-state");
var StatefulMessageService = /** @class */ (function (_super) {
    __extends(StatefulMessageService, _super);
    function StatefulMessageService() {
        var _this = _super.call(this) || this;
        _this.state = new queued_state_1.QueuedState(_this);
        return _this;
    }
    StatefulMessageService.prototype.sendMessage = function (message) {
        this.state.sendMessage(message);
    };
    StatefulMessageService.prototype.authenticate = function () {
        var _this = this;
        setTimeout(function () {
            _this.authenticated = true;
            _this.emit("authenticated");
            var prevState = _this.state;
            _this.state = new ready_state_1.ReadyState();
            prevState.disable();
        }, 1000);
    };
    return StatefulMessageService;
}(events_1.EventEmitter));
var statefulMessageService = new StatefulMessageService();
exports.statefulMessageService = statefulMessageService;
