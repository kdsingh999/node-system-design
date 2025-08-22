class Iterator<T> {
  arr: T[] = [];
  index: number;

  constructor(arr: T[]) {
    this.arr = arr;
    this.index = 0;
  }
  hasNext(): boolean {
    return this.index < this.arr.length - 1;
  }
  next(): T {
    return this.arr[this.index++];
  }
}

export default Iterator;
