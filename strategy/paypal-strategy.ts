import PaymentStrategy from "./payment-strategy";
class PaypalStrategy implements PaymentStrategy {
  method(name: string): void {
    console.log(`Payment method: ${name}`);
  }
  pay(amount: number): void {
    console.log(`Paying ${amount} using PayPal.`);
  }
}

export default PaypalStrategy;
