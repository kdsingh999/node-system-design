import { readdir, stat } from "fs";
import { join } from "path";
import { EventEmitter } from "events";

export function scanFolder(folderPath: string, callback: Function) {
  const emitter = new EventEmitter();
  let finalFileList = [];
  readdir(folderPath, (err: any, items: any) => {
    if (err) {
      emitter.emit("error", err);

      if (callback) callback(err);
      return;
    }
    let pending = items.length || 0;
    if (!pending) {
      emitter.emit("done", []);
      if (callback) {
        callback(null, []);
      }
      return;
    }

    items.forEach((itemName: string) => {
      const fullPath = join(folderPath, itemName);
      stat(fullPath, (errStat, stats) => {
        if (errStat) {
          emitter.emit("error", errStat);
        } else {
          if (stats.isFile()) {
            // we found a file, let's report it
            emitter.emit("file", fullPath);
            finalFileList.push(fullPath);
          }
        }

        if (!--pending) {
          // scanning is done
          emitter.emit("done", finalFileList);
          if (callback) callback(null, finalFileList);
        }
      });
    });
  });
  return emitter;
}
