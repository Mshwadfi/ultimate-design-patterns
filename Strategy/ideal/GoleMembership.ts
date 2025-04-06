import { IMembership } from "./IMemberShipType";

export class GoldMembership implements IMembership {
  calculateDiscount(amount: number): number {
    return amount * 0.9;
  }
}
