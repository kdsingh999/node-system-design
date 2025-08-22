"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var paypal_strategy_1 = require("./paypal-strategy");
var strip_strategy_1 = require("./strip-strategy");
var PaymentFactory = /** @class */ (function () {
    function PaymentFactory() {
    }
    PaymentFactory.createPaymentMethod = function (type) {
        switch (type) {
            case "paypal":
                return new paypal_strategy_1.default();
            case "stripe":
                return new strip_strategy_1.default();
            default:
                throw new Error("Payment method not found");
        }
    };
    return PaymentFactory;
}());
exports.default = PaymentFactory;
