import { Checkout } from "./Checkout";
import { GoldMembership } from "./GoleMembership";
import { IMembership } from "./IMemberShipType";
import { PaypalPayment } from "./PaypalPayment";

class Product {
  constructor(
    private name: string,
    private price: number,
    private membershipType: IMembership
  ) {}

  calculatePrice(): number {
    return this.membershipType.calculateDiscount(this.price);
  }
}

const product = new Product("Macbook", 2000, new GoldMembership());
const discountedPrice = product.calculatePrice();

const checkout = new Checkout(new PaypalPayment());
checkout.processPayment(discountedPrice);
