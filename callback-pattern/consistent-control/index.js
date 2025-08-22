"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async_fetch_data_1 = require("./async-fetch-data");
function createDataWatcher(key) {
    var watchers = [];
    (0, async_fetch_data_1.fetchAsyncData)(key, function (data) {
        watchers.forEach(function (watcher) { return watcher(data); });
    });
    return {
        onReady: function (watcher) { return watchers.push(watcher); },
    };
}
var dataWatcher = createDataWatcher("test");
dataWatcher.onReady(function (data) {
    console.log("this is first ".concat(data));
    var dataWatcher2 = createDataWatcher("test");
    dataWatcher2.onReady(function (data2) { return console.log("this is second ".concat(data2)); });
});
