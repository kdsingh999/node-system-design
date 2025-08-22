"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var payment_factory_1 = require("./payment-factory");
function processPayment(amount, method) {
    var paymentFactory = payment_factory_1.default.createPaymentMethod(method);
    paymentFactory.pay(amount);
    paymentFactory.method(method);
}
processPayment(100, "stripe");
processPayment(100, "paypal");
processPayment(100, "unknown");
