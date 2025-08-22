import * as fs from "fs";
class Exit {
  get name(): string {
    return "exit";
  }
  execute(): void {
    process.exit(0);
  }
}

class Create {
  fileName: string;
  fileContent: string;
  stash: Create[] = [];
  redo: Create[] = [];

  constructor(fileName: string, fileContent: string) {
    this.fileName = fileName;
    this.fileContent = fileContent;
  }
  get name(): string {
    return "create";
  }
  execute(): void {
    console.log("Creating file");
    fs.writeFileSync(this.fileName, this.fileContent);
  }

  undo(): void {
    console.log("Deleting file");
    fs.unlinkSync(this.fileName);
  }
}

class Help {
  get name(): string {
    return "help";
  }

  execute(): void {
    console.log("Commands: create <fileName> <text> | exit");
  }
}

class Undo {
  get name(): string {
    return "undo";
  }
  execute(): void {
    console.log("Undoing last command");
  }
}

export { Exit, Create, Help };
