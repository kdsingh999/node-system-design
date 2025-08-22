// function toSecretString(str: String, callback: Function) {
//     callback(null, str.replace(/[a-zA-Z0-9]/g, "*"));
//   process.nextTick(() => {
//     callback(null, str.replace(/[a-zA-Z]/g, "*"));
//   });
// }
// console.log("Before");
// toSecretString("hell12o7086 hkhdkjfh897 h;hjksh78", (err: any, secret: any) =>
//   console.log(secret)
// );
// console.log("After");
// function delay(time: number, callback: Function) {
//   setTimeout(callback, time * 1000);
// }
// console.log("Start timer");
// delay(5, () => {
//   console.log("Timer finished 111");
//   delay(5, () => {
//     console.log("Timer finished 222");
//   });
// });
// console.log("Stop timer");
//Continuation-passing style (CPS)
//Synchronous CPS
function subtract(a, b, callback) {
    callback(a - b);
}
console.log("Before");
subtract(20, 5, function (result) { return console.log(result); });
console.log("After");
//Asynchronous CPS
function subtractAsync(a, b, callback) {
    setTimeout(function () { return callback(a - b); }, 0);
}
console.log("Before");
subtractAsync(20, 5, function (result) { return console.log(result); });
console.log("After");
//Non-CPS callbacks
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
arr.forEach(function (item) {
    arr.push(item + 1);
});
console.log(arr);
