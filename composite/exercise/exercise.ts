interface CartItem {
  getPrice(): number;
  getName(): string;
}

class Product implements CartItem {
  constructor(private name: string, private price: number) {}

  getPrice(): number {
    return this.price;
  }

  getName(): string {
    return this.name;
  }
}

class Bundle implements CartItem {
  private items: CartItem[] = [];

  constructor(private bundleName: string, private discount: number = 0) {}

  addItem(item: CartItem): void {
    this.items.push(item);
  }

  getPrice(): number {
    const total = this.items.reduce((sum, item) => sum + item.getPrice(), 0);
    return total - this.discount * total;
  }

  getName(): string {
    return `${this.bundleName} (Bundle)`;
  }
}

const techBundle = new Bundle("Tech Bundle", 0.13);
techBundle.addItem(new Product("Mouse", 500));
techBundle.addItem(new Product("Keyboard", 1000));

const cart = [techBundle, new Product("Football Boots", 2300)];

const totalPrice = cart.reduce((acc, item) => acc + item.getPrice(), 0);
console.log(totalPrice);
console.log(techBundle.getPrice());
console.log(new Product("Adidas Turf", 3200).getPrice());
