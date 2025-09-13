import { Transform } from "node:stream";
export class ConcurrentStream extends Transform {
    constructor(concurrentNumber, processChunk, options = {}) {
        super({ objectMode: true, ...options });
        this.concurrentNumber = concurrentNumber;
        this.processChunk = processChunk;
        this.activeTasks = 0;
        this.addNewTask = null;
        this.finalizeCallback = null;
    }
    _transform(chunk, encoding, callback) {
        console.log("stream==>", chunk);
        this.activeTasks++;
        this.processChunk(chunk, encoding, this.push.bind(this), this._taskComplete.bind(this));
        if (this.activeTasks < this.concurrentNumber) {
            callback();
        }
        else {
            this.addNewTask = callback;
        }
    }
    _flush(callback) {
        if (this.activeTasks > 0) {
            this.finalizeCallback = callback;
        }
        else {
            callback();
        }
    }
    _taskComplete(error) {
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
