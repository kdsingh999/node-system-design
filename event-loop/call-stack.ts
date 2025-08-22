const add = (a: number, b: number) => {
  return a + b;
};

const addNumber = (n: number) => add(n, n);

const printNumber = (n: number) => {
  const result = addNumber(n);
  console.log(result);
};

printNumber(5);

//----stack-----

//add(5, 5)
//addNumber(5)
//printNumber()
//anonymous()
