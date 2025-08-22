"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WeatherStation = /** @class */ (function () {
    function WeatherStation() {
        this.observers = [];
        this.temperature = 0;
        this.humidity = 0;
        this.pressure = 0;
    }
    WeatherStation.prototype.addObserver = function (observer) {
        this.observers.push(observer);
    };
    WeatherStation.prototype.setTemperature = function (temperature) {
        this.temperature = temperature;
        this.notifyObservers();
    };
    WeatherStation.prototype.setHumidity = function (humidity) {
        this.humidity = humidity;
        this.notifyObservers();
    };
    WeatherStation.prototype.setPressure = function (pressure) {
        this.pressure = pressure;
        this.notifyObservers();
    };
    WeatherStation.prototype.notifyObservers = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update(this.temperature, this.humidity, this.pressure);
        }
    };
    return WeatherStation;
}());
exports.default = WeatherStation;
