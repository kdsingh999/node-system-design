import { Transform } from "node:stream";
import { TransformCallback } from "stream";

export class ConcurrentStream extends Transform {
  concurrentNumber: number;
  processChunk: any;
  activeTasks: number;
  finalizeCallback: any;
  addNewTask: any;
  constructor(concurrentNumber: number, processChunk: any, options = {}) {
    super({ objectMode: true, ...options });
    this.concurrentNumber = concurrentNumber;
    this.processChunk = processChunk;
    this.activeTasks = 0;
    this.addNewTask = null;
    this.finalizeCallback = null;
  }
  _transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    console.log("stream==>", chunk);
    this.activeTasks++;
    this.processChunk(
      chunk,
      encoding,
      this.push.bind(this),
      this._taskComplete.bind(this)
    );
    if (this.activeTasks < this.concurrentNumber) {
      callback();
    } else {
      this.addNewTask = callback;
    }
  }

  _flush(callback: TransformCallback): void {
    if (this.activeTasks > 0) {
      this.finalizeCallback = callback;
    } else {
      callback();
    }
  }

  _taskComplete(error: any) {
    this.activeTasks--;
    if (error) {
      return this.emit("error", error);
    }

    const tempAddNewTask = this.addNewTask;
    this.addNewTask = null;

    tempAddNewTask && tempAddNewTask();

    if (this.activeTasks == 0 && this.finalizeCallback) {
      this.finalizeCallback();
    }
  }
}
