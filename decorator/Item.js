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
exports.SilverCase = exports.Item = void 0;
var Item = /** @class */ (function () {
    function Item(name, price) {
        this.name = name;
        this.price = price;
    }
    Item.prototype.showDetails = function () {
        console.log("Item: ".concat(this.name, ", Price: $").concat(this.price));
    };
    return Item;
}());
exports.Item = Item;
var SilverCase = /** @class */ (function (_super) {
    __extends(SilverCase, _super);
    function SilverCase(item) {
        var _this = _super.call(this, item.name, item.price) || this;
        item.name += " (Silver)";
        item.price += 10;
        return _this;
    }
    return SilverCase;
}(Item));
exports.SilverCase = SilverCase;
