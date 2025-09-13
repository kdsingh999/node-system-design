import combine from "stream-combiner2";
import { createCSVParserStream } from "./csv-parser-stream.js";
import { createDataFilterStream } from "./data-filter-stream.js";
import { createJSONTransformerStream } from "./json-transformer-stream.js";

export function createCombinedStream(criteria: any) {
  return combine(
    createCSVParserStream(),
    createDataFilterStream(criteria),
    createJSONTransformerStream()
  );
}
