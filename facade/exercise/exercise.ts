class Order {
  constructor(
    public customerId: string,
    public productId: string,
    public productName: string,
    public quantity: number,
    public price: number,
    public totalAmount: number,
    public shippingAddress: string,
    public paymentMethod: string
  ) {}
}

interface PaymentProcessor {
  processPayment(price: number): Promise<void>;
}

class InventoryManager {
  constructor(private productId: string, private quantity: number) {}

  async checkInventory(): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(
          `Checking inventory for product ${this.productId} with quantity ${this.quantity}`
        );
        resolve(true);
      }, 700);
    });
  }

  async reserveItems(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Reserved ${this.quantity} units of ${this.productId}`);
        resolve();
      }, 1200);
    });
  }
}

class VisaPaymentProcessor implements PaymentProcessor {
  async processPayment(price: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Processing payment of $" + price + " using Visa");
        resolve();
      }, 2000);
    });
  }
}

class ShippingManager {
  constructor(private address: string, private productName: string) {}

  scheduleShipment() {
    const trackingNumber = `TRK${Date.now()}`;
    console.log(`Scheduling shipment for ${this.productName}`);
    console.log(`Shipping to: ${this.address}`);
    console.log(`Tracking number: ${trackingNumber}`);
  }
}

class OrderFacade {
  constructor(private order: Order) {}

  async placeOrder() {
    const inventoryManager = new InventoryManager(
      this.order.productId,
      this.order.quantity
    );
    const paymentProcessor = new VisaPaymentProcessor();
    const shippingManager = new ShippingManager(
      this.order.shippingAddress,
      this.order.productName
    );

    const isAvailable = await inventoryManager.checkInventory();

    if (isAvailable) {
      await inventoryManager.reserveItems();
      await paymentProcessor.processPayment(this.order.price);
      shippingManager.scheduleShipment();
      console.log(`Order for ${this.order.productName} placed successfully!`);
    } else {
      console.log(`Order failed: ${this.order.productName} is out of stock.`);
    }
  }
}

//Example usage:
const order = new Order(
  "cust123",
  "prod456",
  "Laptop",
  2,
  1000,
  2000,
  "123 Main St, NY",
  "visa"
);

const orderFacade = new OrderFacade(order);
orderFacade.placeOrder();
