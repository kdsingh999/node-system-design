"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Product = /** @class */ (function () {
    function Product(name, price) {
        this.name = name;
        this.price = price;
    }
    Product.prototype.writeLn = function () {
        console.log("Product: ".concat(this.name, ", Price: $").concat(this.price));
    };
    return Product;
}());
exports.default = Product;
