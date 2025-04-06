export interface IPaymentStrategy {
  processPayment(amount: number): void;
}
