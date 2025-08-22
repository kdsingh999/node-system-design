"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAsyncData = fetchAsyncData;
var dataCached = new Map();
function fetchAsyncData(key, callback) {
    if (dataCached.has(key)) {
        process.nextTick(function () { return callback(dataCached.get(key)); });
    }
    else {
        setTimeout(function () {
            var fakeData = "Fetch Data from ".concat(key);
            dataCached.set(key, fakeData);
            callback(dataCached.get(key));
        }, 500);
    }
}
