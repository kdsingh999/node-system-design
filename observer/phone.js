"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Phone = /** @class */ (function () {
    function Phone() {
    }
    Phone.prototype.update = function (temperature, humidity, pressure) {
        console.log("Phone:=====>Current conditions: ".concat(temperature, " F degrees and ").concat(humidity, "% humidity"));
    };
    return Phone;
}());
exports.default = Phone;
