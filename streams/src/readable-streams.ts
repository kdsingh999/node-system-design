import { Readable } from "stream";

class ArrayStream extends Readable {
  rivers: any[];
  index: number;
  constructor(rivers: any[] = [], ...rest: any) {
    super(...rest);
    this.rivers = rivers;
    this.index = 0;
  }
  _read(): void {
    if (this.index <= this.rivers.length) {
      const chunk = {
        data: this.rivers[this.index],
        index: this.index,
      };
      this.push(chunk);
      this.index += 1;
    } else {
      this.push(null);
    }
  }
}

const rivers = ["Amazon", "Nile", "Ganga", "Yamuna", "Ghaghra", "Rapti"];

export default function readableStreams() {
  const riverStream = new ArrayStream(rivers, {
    objectMode: true,
  });

  riverStream.on("data", (chunk: any) => {
    console.log(chunk);
  });
  riverStream.on("end", () => console.log("Stream ended."));
}
