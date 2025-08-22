var add = function (a, b) {
    return a + b;
};
var addNumber = function (n) { return add(n, n); };
var printNumber = function (n) {
    var result = addNumber(n);
    console.log(result);
};
printNumber(5);
