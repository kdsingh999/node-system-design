interface PaymentStrategy {
  method(name: string): void;
  pay(amount: number): void;
}
export default PaymentStrategy;
