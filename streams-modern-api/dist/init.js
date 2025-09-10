import sqlite3 from "sqlite3";
import { faker } from "@faker-js/faker";
const connection = sqlite3.verbose();
const db = new connection.Database("./data/db");
function run(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err)
                reject(err);
            else
                resolve();
        });
    });
}
console.time("database insert");
await run("CREATE TABLE IF NOT EXISTS users (name TEXT, age NUMBER)");
function buildFakeUser() {
    return [faker.internet.username(), faker.number.int({ min: 22, max: 120 })];
}
// const promises: Promise<void>[] = [];
// for (let i = 0; i < 100; i++) {
//   const user = buildFakeUser();
//   promises.push(run("INSERT INTO users(name, age) VALUES (?, ?)", user));
// }
// await Promise.all(promises);
db.all("SELECT COUNT(rowid) as counter FROM users", (err, row) => {
    if (err) {
        console.error("Error reading from database", err);
        return;
    }
    console.log(row);
});
console.timeEnd("database insert end");
