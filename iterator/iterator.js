"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Iterator = /** @class */ (function () {
    function Iterator(arr) {
        this.arr = [];
        this.arr = arr;
        this.index = 0;
    }
    Iterator.prototype.hasNext = function () {
        return this.index < this.arr.length - 1;
    };
    Iterator.prototype.next = function () {
        return this.arr[this.index++];
    };
    return Iterator;
}());
exports.default = Iterator;
