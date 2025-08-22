"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Customer_1 = require("./Customer");
var Item_1 = require("./Item");
//base case
//golden case
//silver case
//golden+silver
var customer = new Customer_1.default("John Doe", 1000);
var golden_phone_case = new Item_1.Item("Phone Case", 50);
var silver_phone_case = new Item_1.SilverCase(golden_phone_case);
customer.buy(golden_phone_case);
customer.buy(silver_phone_case);
customer.displayStatus();
