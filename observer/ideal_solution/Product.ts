export class Product {
  private name: string;
  private price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  setPrice(price: number): void {
    if (price >= 0) {
      this.price = price;
    } else {
      throw new Error("Price cannot be negative");
    }
  }
}
