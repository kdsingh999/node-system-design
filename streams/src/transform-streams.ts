import { Transform, TransformCallback } from "stream";

class ChangeText extends Transform {
  replaceCharacter: string;
  constructor(char: string) {
    super();
    this.replaceCharacter = char;
  }
  _transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    const transformedChunk = chunk
      .toString()
      .replace(/[a-zA-Z0-9]/g, this.replaceCharacter);
    this.push(transformedChunk);
    callback();
  }

  _flush(callback: TransformCallback): void {
    this.push("more chunk of data is being passed...");
    callback();
  }
}

export default function executeTransForm() {
  var smileStream = new ChangeText("😂");
  process.stdin.pipe(smileStream).pipe(process.stdout);
}
