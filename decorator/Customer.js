"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Customer = /** @class */ (function () {
    function Customer(customerName, balance) {
        if (balance === void 0) { balance = 0; }
        this.purchasedItems = [];
        this.customerName = customerName;
        this.balance = balance;
    }
    Customer.prototype.buy = function (item) {
        if (item.price > this.balance) {
            console.log("".concat(this.customerName, " does not have enough money to buy ").concat(item.name, "."));
        }
        else {
            console.log("Purchasing " + item.name + " for $" + item.price + ".");
            this.balance -= item.price;
            this.purchasedItems.push(item);
        }
    };
    Customer.prototype.displayStatus = function () {
        console.log("".concat(this.customerName, " has a balance of $").concat(this.balance, " and has purchased the following items:"));
        this.purchasedItems.forEach(function (item) { return console.log(item.name); });
        console.log("".concat(this.customerName, " has a balance of $").concat(this.balance.toFixed(2), "."));
    };
    return Customer;
}());
exports.default = Customer;
