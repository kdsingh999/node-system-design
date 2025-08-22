"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var product_1 = require("./product");
var iterator_1 = require("./iterator");
var product1 = new product_1.default("Laptop", 1000);
var product2 = new product_1.default("Mobile", 500);
var product3 = new product_1.default("Tablet", 700);
var product4 = new product_1.default("Monitor", 1000);
var products = [product1, product2, product3, product4];
var iterator = new iterator_1.default(products);
while (iterator.hasNext()) {
    iterator.next().writeLn();
}
