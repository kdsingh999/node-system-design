import csv from "csv-parser";
export function createCSVParserStream() {
    return csv();
}
