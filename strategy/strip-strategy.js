"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StripStrategy = /** @class */ (function () {
    function StripStrategy() {
    }
    StripStrategy.prototype.method = function (name) {
        console.log("Payment method: ".concat(name));
    };
    StripStrategy.prototype.pay = function (amount) {
        console.log("Paying ".concat(amount, " using Stripe."));
    };
    return StripStrategy;
}());
exports.default = StripStrategy;
