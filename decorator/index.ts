import Customer from "./Customer";
import { Item, SilverCase } from "./Item";

//base case
//golden case
//silver case
//golden+silver
const customer = new Customer("John Doe", 1000);
const golden_phone_case = new Item("Phone Case", 50);

const silver_phone_case = new SilverCase(golden_phone_case);
customer.buy(golden_phone_case);
customer.buy(silver_phone_case);
customer.displayStatus();
