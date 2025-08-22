"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PaypalStrategy = /** @class */ (function () {
    function PaypalStrategy() {
    }
    PaypalStrategy.prototype.method = function (name) {
        console.log("Payment method: ".concat(name));
    };
    PaypalStrategy.prototype.pay = function (amount) {
        console.log("Paying ".concat(amount, " using PayPal."));
    };
    return PaypalStrategy;
}());
exports.default = PaypalStrategy;
