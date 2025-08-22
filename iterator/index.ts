import Product from "./product";
import Iterator from "./iterator";

const product1 = new Product("Laptop", 1000);
const product2 = new Product("Mobile", 500);
const product3 = new Product("Tablet", 700);
const product4 = new Product("Monitor", 1000);

const products = [product1, product2, product3, product4];

const iterator = new Iterator(products);

while (iterator.hasNext()) {
  iterator.next().writeLn();
}
