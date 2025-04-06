import { MEMBERSHIP_TYPES } from "./MemberShipTypes";
import { PAYMENT_METHODS } from "./PaymentMethods";

class Pruduct {
  private name: string;
  private price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  calculatePrice(membershipType: string) {
    if (membershipType === MEMBERSHIP_TYPES.GOLD) {
      const price = this.price * 0.9;
      return price;
    } else if (membershipType === MEMBERSHIP_TYPES.PREMUIM) {
      const price = this.price * 0.8;
      return price;
    } else if (membershipType === MEMBERSHIP_TYPES.REGULAR) {
      return this.price;
    }
  }

  processPayment(paymentMethod: string) {
    if (paymentMethod === PAYMENT_METHODS.PAYPAL) {
      console.log("processing payment with paypal...");
    } else if (paymentMethod === PAYMENT_METHODS.VISA) {
      console.log("processing payment with visa...");
    } else if (paymentMethod === PAYMENT_METHODS.INSTAPAY) {
      console.log("processing payment with instapay...");
    }
  }
}
