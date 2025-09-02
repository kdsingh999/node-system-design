import { EventEmitter } from "events";
import { readFile } from "fs";
class ReadEventEmitter extends EventEmitter {
  searchTerm: string;
  files: any[];
  constructor(searchTerm: string) {
    super();
    this.searchTerm = searchTerm;
    this.files = [];
  }
  addFile(fileName: any) {
    this.files.push(fileName);
    return this;
  }
  search() {
    for (const file of this.files) {
      readFile(file, "utf8", (error: any, data: any) => {
        if (error) {
          return this.emit("error", error);
        }
        this.emit("fileRead", data);

        const lines = data.trim().split("\n");

        for (let i = 1; i < lines.length; i++) {
          const row = lines[i].split(",");
          const found = row.some((col: any) => col.includes(this.searchTerm));
          if (found) {
            this.emit("recordFound", file, row);
          }
        }
      });
    }
    return this;
  }
}

export default ReadEventEmitter;
