"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someAsyncTask = someAsyncTask;
function someAsyncTask(id) {
    /* ... */
    console.log("Async task with id=".concat(id, " is started"));
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("Async task with id=".concat(id, " is finished"));
            resolve("Result of async task=" + id);
        }, 2000);
    });
}
