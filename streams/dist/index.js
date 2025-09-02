"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const read_csv_1 = require("./read-csv");
(0, read_csv_1.searchRecordInCsv)(["./src/customer.csv", "./src/sales.csv"], "Alice")
    .on("fileRead", (fileName) => {
    console.log(`✅ Done Reading ${fileName}`);
})
    .on("recordFound", (file, row) => {
    console.log(`🎯 Record found in ${file}:`, row);
})
    .on("error", (error) => {
    console.error(`❌ Error: ${error}`);
});
