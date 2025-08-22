"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var notification_registery_1 = require("./notification-registery");
(_a = notification_registery_1.notificationRegistery.get("email")) === null || _a === void 0 ? void 0 : _a.notify("Hello", "John");
(_b = notification_registery_1.notificationRegistery.get("sms")) === null || _b === void 0 ? void 0 : _b.notify("Hello", "12345676897");
