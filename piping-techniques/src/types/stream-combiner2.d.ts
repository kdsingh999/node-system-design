declare module "stream-combiner2" {
  import { Readable, Writable, Duplex, Transform } from "stream";

  type StreamLike = Readable | Writable | Duplex | Transform;

  /**
   * Combines multiple streams into a single duplex stream.
   * Errors are propagated properly.
   */
  function combine(...streams: StreamLike[]): Duplex;

  export = combine;
}
