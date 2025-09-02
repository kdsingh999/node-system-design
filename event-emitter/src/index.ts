// import ReadEventEmitter from "./read-csv-class";

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

import { scanFolder } from "./scan-folder";

const emitter = scanFolder("myDir", (err: any, allFiles: any) => {
  if (err) {
    return console.log(`Callback reported error: ${err}`);
  }
  console.log(`Callback final files list:${allFiles}`);
});

emitter
  .on("file", (filePath: any) => {
    console.log(`File is found on:${filePath}`);
  })
  .on("done", (fileList: any) => {
    console.log(`All done scanning,files are: ${fileList}`);
  })
  .on("error", (error: any) => {
    console.log(`Error is found on :${error}`);
  });
