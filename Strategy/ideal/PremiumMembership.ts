import { IMembership } from "./IMemberShipType";

export class PremiumMembership implements IMembership {
  calculateDiscount(amount: number): number {
    return amount * 0.8;
  }
}
