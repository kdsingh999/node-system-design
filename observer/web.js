"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Web = /** @class */ (function () {
    function Web() {
    }
    Web.prototype.update = function (temperature, humidity, pressure) {
        console.log("Web==========>Current conditions: ".concat(temperature, " F degrees and ").concat(humidity, "% humidity"));
    };
    return Web;
}());
exports.default = Web;
