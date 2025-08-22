"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SmsNotifier = /** @class */ (function () {
    function SmsNotifier() {
    }
    SmsNotifier.prototype.notify = function (message, user) {
        console.log("Sending SMS to ".concat(user, ": ").concat(message));
    };
    return SmsNotifier;
}());
exports.default = SmsNotifier;
