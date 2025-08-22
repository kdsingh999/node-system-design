"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cancel_error_1 = require("./cancel-error");
function createCancellable() {
    var reqCanceled = false;
    function cancelWrapper(promiseFn) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (reqCanceled) {
            return Promise.reject(new cancel_error_1.default());
        }
        return promiseFn.apply(void 0, args);
    }
    function cancel() {
        reqCanceled = true;
    }
    return {
        cancelWrapper: cancelWrapper,
        cancel: cancel,
    };
}
exports.default = createCancellable;
