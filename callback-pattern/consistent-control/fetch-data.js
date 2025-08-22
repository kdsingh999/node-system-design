"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = fetchData;
var dataCached = new Map();
function fetchData(key, callback) {
    if (dataCached.has(key)) {
        callback(dataCached.get(key));
    }
    else {
        setTimeout(function () {
            var fakeData = "Fetch Data from ".concat(key);
            dataCached.set(key, fakeData);
            callback(dataCached.get(key));
        }, 500);
    }
}
