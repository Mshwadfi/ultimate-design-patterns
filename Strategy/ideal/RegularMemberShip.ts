import { IMembership } from "./IMemberShipType";

export class RegularMembership implements IMembership {
  calculateDiscount(amount: number): number {
    return amount;
  }
}
