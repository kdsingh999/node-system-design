"use strict";
// import ReadEventEmitter from "./read-csv-class";
Object.defineProperty(exports, "__esModule", { value: true });
// const searchInstance = new ReadEventEmitter("Alice");
// searchInstance
//   .addFile("./src/customer.csv")
//   .addFile("./src/sales.csv")
//   .search()
//   .on("fileRead", (fileName: string) => {
//     console.log(`✅ Done Reading ${fileName}`);
//   })
//   .on("recordFound", (file: string, row: any) => {
//     console.log(`🎯 Record found in ${file}:`, row);
//   })
//   .on("error", (error: any) => {
//     console.error(`❌ Error: ${error}`);
//   });
// searchRecordInCsv(["./src/customer.csv", "./src/sales.csv"], "Alice")
//   .on("fileRead", (fileName: string) => {
//     console.log(`✅ Done Reading ${fileName}`);
//   })
//   .on("recordFound", (file: string, row: any) => {
//     console.log(`🎯 Record found in ${file}:`, row);
//   })
//   .on("error", (error: any) => {
//     console.error(`❌ Error: ${error}`);
//   });
const scan_folder_1 = require("./scan-folder");
const emitter = (0, scan_folder_1.scanFolder)("myDir", (err, allFiles) => {
    if (err) {
        return console.log(`Callback reported error: ${err}`);
    }
    console.log(`Callback final files list:${allFiles}`);
});
emitter
    .on("file", (filePath) => {
    console.log(`File is found on:${filePath}`);
})
    .on("done", (fileList) => {
    console.log(`All done scanning,files are: ${fileList}`);
})
    .on("error", (error) => {
    console.log(`Error is found on :${error}`);
});
