"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var receiver_1 = require("./receiver");
var commands_1 = require("./commands");
var terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
console.log("Commands: create <fileName> <text> | exit");
terminal.prompt();
terminal.on("line", function (input) {
    var _a = input.split(" "), command = _a[0], fileName = _a[1], content = _a.slice(2);
    var fileContent = content.join(" ");
    switch (command) {
        case "create":
            receiver_1.default.execute(new commands_1.Create(fileName, fileContent));
            break;
        case "exit":
            //   terminal.close();
            receiver_1.default.execute(new commands_1.Exit());
            break;
        default:
            console.log("Unknown command");
            break;
    }
});
