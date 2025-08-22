import PaymentStrategy from "./payment-strategy";

class StripStrategy implements PaymentStrategy {
  method(name: string): void {
    console.log(`Payment method: ${name}`);
  }
  pay(amount: number): void {
    console.log(`Paying ${amount} using Stripe.`);
  }
}

export default StripStrategy;
