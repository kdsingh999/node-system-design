// const slowTask = (a: number, b: number) => {
//   for (let i = 0; i < 99999999; i++) {}
//   return a + b;
// };
// const a = slowTask(3, 3);
// const b = slowTask(4, 4);
// const c = slowTask(5, 5);
// console.log(a);
// console.log(b);
// console.log(c);
var slowTask = function (a, b) {
    setTimeout(function () {
        console.log(a + b);
    }, 0);
};
slowTask(3, 3);
slowTask(4, 4);
slowTask(5, 5);
// The stack is empty but the queue is not empty,so the event
//  loop start moving callbacks from the queue into the call
// stack until the queue is empty
//Node is not part of Event loop .
// The Event loop only monitors the call stack and the event queue.
