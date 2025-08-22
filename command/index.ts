import * as readline from "readline";

import receiver from "./receiver";
import { Create, Exit } from "./commands";

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Commands: create <fileName> <text> | exit");
terminal.prompt();

terminal.on("line", (input) => {
  const [command, fileName, ...content] = input.split(" ");
  const fileContent = content.join(" ");

  switch (command) {
    case "create":
      receiver.execute(new Create(fileName, fileContent));
      break;
    case "exit":
      //   terminal.close();
      receiver.execute(new Exit());
      break;
    case "help":
      receiver.execute(new Exit());
      break;
    default:
      console.log("Unknown command");
      break;
  }
});
