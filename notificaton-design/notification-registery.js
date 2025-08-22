"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRegistery = exports.notificationRegistery = void 0;
var EmailNotifier_1 = require("./EmailNotifier");
var SmsNotifier_1 = require("./SmsNotifier");
var NotificationRegistery = /** @class */ (function () {
    function NotificationRegistery() {
        this.map = new Map();
    }
    NotificationRegistery.prototype.register = function (type, notification) {
        this.map.set(type, notification);
    };
    NotificationRegistery.prototype.get = function (type) {
        return this.map.get(type);
    };
    return NotificationRegistery;
}());
exports.NotificationRegistery = NotificationRegistery;
var notificationRegistery = new NotificationRegistery();
exports.notificationRegistery = notificationRegistery;
notificationRegistery.register("email", new EmailNotifier_1.default());
notificationRegistery.register("sms", new SmsNotifier_1.default());
