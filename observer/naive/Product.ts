export class Product {
  private name: string;
  private price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  // Getters and Setters
  get getName(): string {
    return this.name;
  }

  set setName(name: string) {
    this.name = name;
  }

  get getPrice(): number {
    return this.price;
  }

  set setPrice(price: number) {
    if (price >= 0) {
      this.price = price;
    } else {
      throw new Error("Price cannot be negative");
    }
  }
}
