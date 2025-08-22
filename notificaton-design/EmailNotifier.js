"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EmailNotifier = /** @class */ (function () {
    function EmailNotifier() {
    }
    EmailNotifier.prototype.notify = function (message, user) {
        console.log("Sending email to ".concat(user, " with message: ").concat(message));
    };
    return EmailNotifier;
}());
exports.default = EmailNotifier;
