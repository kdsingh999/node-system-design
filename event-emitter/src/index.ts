import { searchRecordInCsv } from "./read-csv";

searchRecordInCsv(["./src/customer.csv", "./src/sales.csv"], "Alice")
  .on("fileRead", (fileName: string) => {
    console.log(`✅ Done Reading ${fileName}`);
  })
  .on("recordFound", (file: string, row: any) => {
    console.log(`🎯 Record found in ${file}:`, row);
  })
  .on("error", (error: any) => {
    console.error(`❌ Error: ${error}`);
  });
