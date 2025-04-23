enum orderStates {
  NEW = "NEW",
  PROCESSED = "PROCESSED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
}
class Order {
  private _state: orderStates;

  constructor(state: orderStates) {
    this._state = state;
  }

  getState(): orderStates {
    return this._state;
  }

  setState(state: orderStates): void {
    this._state = state;
  }
}

interface OrderState {
  processOrder(): void;
  shipOrder(): void;
  deliverOrder(): void;
  cancelOrder(): void;
}

class NewOrderState implements OrderState {
  constructor(private orderManager: OrderManager) {}

  processOrder(): void {
    console.log("Processing order...");
    this.orderManager.changeState(new ProcessingOrderState(this.orderManager));
  }

  shipOrder(): void {
    console.log("Cannot ship a new order directly.");
  }

  deliverOrder(): void {
    console.log("Cannot deliver a new order directly.");
  }

  cancelOrder(): void {
    console.log("Order has been canceled.");
    this.orderManager.changeState(new CanceledOrderState(this.orderManager));
  }
}

class ProcessingOrderState implements OrderState {
  constructor(private orderManager: OrderManager) {}

  processOrder(): void {
    console.log("Order is already being processed.");
  }

  shipOrder(): void {
    console.log("Order is being shipped...");
    this.orderManager.changeState(new ShippedOrderState(this.orderManager));
  }

  deliverOrder(): void {
    console.log("Cannot deliver before shipping.");
  }

  cancelOrder(): void {
    console.log("Order has been canceled.");
    this.orderManager.changeState(new CanceledOrderState(this.orderManager));
  }
}

class ShippedOrderState implements OrderState {
  constructor(private orderManager: OrderManager) {}

  processOrder(): void {
    console.log("Order has already been processed and shipped.");
  }

  shipOrder(): void {
    console.log("Order is already shipped.");
  }

  deliverOrder(): void {
    console.log("Order is being delivered...");
    this.orderManager.changeState(new DeliveredOrderState(this.orderManager));
  }

  cancelOrder(): void {
    console.log("Cannot cancel a shipped order.");
  }
}

class DeliveredOrderState implements OrderState {
  constructor(private orderManager: OrderManager) {}

  processOrder(): void {
    console.log("Order is already delivered.");
  }

  shipOrder(): void {
    console.log("Order is already delivered.");
  }

  deliverOrder(): void {
    console.log("Order is being delivered...");
  }

  cancelOrder(): void {
    console.log("Cannot cancel a delivered order.");
  }
}

class CanceledOrderState implements OrderState {
  constructor(private orderManager: OrderManager) {}

  processOrder(): void {
    console.log("Cannot process a canceled order.");
  }

  shipOrder(): void {
    console.log("Cannot ship a canceled order.");
  }

  deliverOrder(): void {
    console.log("Cannot deliver a canceled order.");
  }

  cancelOrder(): void {
    console.log("Order is already canceled.");
  }
}

class OrderManager {
  private order: Order;
  private orderState: OrderState;

  constructor(order: Order) {
    this.order = order;
    this.orderState = new NewOrderState(this);
  }

  changeState(newState: OrderState): void {
    this.orderState = newState;
  }

  processOrder(): void {
    this.orderState.processOrder();
  }

  shipOrder(): void {
    this.orderState.shipOrder();
  }

  deliverOrder(): void {
    this.orderState.deliverOrder();
  }

  cancelOrder(): void {
    this.orderState.cancelOrder();
  }
}

const initialOrder = new Order(orderStates.NEW);
const manager = new OrderManager(initialOrder);

manager.processOrder();

manager.cancelOrder();
manager.shipOrder();

manager.deliverOrder();

manager.processOrder();
