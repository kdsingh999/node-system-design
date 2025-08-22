import { Item } from "./Item";
class Customer {
  customerName: string;
  balance: number;
  purchasedItems: Item[] = [];
  constructor(customerName: string, balance: number = 0) {
    this.customerName = customerName;
    this.balance = balance;
  }
  buy(item: Item) {
    if (item.price > this.balance) {
      console.log(
        `${this.customerName} does not have enough money to buy ${item.name}.`
      );
    } else {
      console.log("Purchasing " + item.name + " for $" + item.price + ".");
      this.balance -= item.price;
      this.purchasedItems.push(item);
    }
  }
  displayStatus() {
    console.log(
      `${this.customerName} has a balance of $${this.balance} and has purchased the following items:`
    );
    this.purchasedItems.forEach((item) => console.log(item.name));
    console.log(
      `${this.customerName} has a balance of $${this.balance.toFixed(2)}.`
    );
  }
}
export default Customer;
