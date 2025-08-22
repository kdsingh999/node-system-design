function* SimpleGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = SimpleGenerator();

console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
