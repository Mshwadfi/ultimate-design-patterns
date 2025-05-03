enum PLANE_TYPE {
  COMMERCIAL = "commercial",
  TRAVEL = "travel",
}

enum EVENT_TYPE {
  LANDING = "landing",
  TAKEOFF = "takeoff",
}

// Define message formatting for different event types/ instead of multiple if statements to check the event type
//  and format the message accordingly we can use a registry pattern to register different event handlers.
//  This way, we can easily add or remove handlers without modifying the main logic of the Control Tower.
//  this applies the open-closed principle of SOLID design principles.

interface EventHandler {
  formatMessage(planeName: string, message: string): string;
}

class EventHandlerRegistry {
  private static handlers: Map<EVENT_TYPE, EventHandler> = new Map();

  static register(eventType: EVENT_TYPE, handler: EventHandler): void {
    this.handlers.set(eventType, handler);
  }

  static getHandler(eventType: EVENT_TYPE): EventHandler | undefined {
    return this.handlers.get(eventType);
  }

  static hasHandler(eventType: EVENT_TYPE): boolean {
    return this.handlers.has(eventType);
  }
}

// Register only landing and takeoff handlers
EventHandlerRegistry.register(EVENT_TYPE.LANDING, {
  formatMessage: (planeName, message) =>
    `${planeName} is requesting landing permission: ${message}`,
});

EventHandlerRegistry.register(EVENT_TYPE.TAKEOFF, {
  formatMessage: (planeName, message) =>
    `${planeName} is requesting takeoff permission: ${message}`,
});

interface ControlTowerMediator {
  registerPlane(plane: Plane): void;
  notify(plane: Plane, message: string, eventType?: EVENT_TYPE): void;
}

class Plane {
  name: string;
  type: PLANE_TYPE;
  controlTower: ControlTowerMediator;

  constructor(
    name: string,
    type: PLANE_TYPE,
    controlTower: ControlTowerMediator
  ) {
    this.name = name;
    this.type = type;
    this.controlTower = controlTower;

    // Register with control tower upon creation
    this.controlTower.registerPlane(this);
  }

  getName(): string {
    return this.name;
  }

  getType(): PLANE_TYPE {
    return this.type;
  }

  notify(message: string): void {
    console.log(`${this.name} received message: ${message}`);
  }

  sendMessage(message: string, eventType?: EVENT_TYPE): void {
    this.controlTower.notify(this, message, eventType);
  }

  requestLanding(): void {
    this.sendMessage(`Ready for landing`, EVENT_TYPE.LANDING);
  }

  requestTakeoff(): void {
    this.sendMessage(`Ready for takeoff`, EVENT_TYPE.TAKEOFF);
  }

  broadcastMessage(message: string): void {
    this.sendMessage(message);
  }
}

class ControlTower implements ControlTowerMediator {
  private planes: Plane[] = [];

  registerPlane(plane: Plane): void {
    this.planes.push(plane);
    console.log(`Plane ${plane.getName()} registered with Control Tower`);
  }

  notify(plane: Plane, message: string, eventType?: EVENT_TYPE): void {
    console.log(
      `Control Tower received message from ${plane.getName()}: ${message}`
    );

    let broadcastMessage = message;

    // If there's an event type, use the appropriate handler to format the message
    if (eventType && EventHandlerRegistry.hasHandler(eventType)) {
      const handler = EventHandlerRegistry.getHandler(eventType);
      broadcastMessage = handler!.formatMessage(plane.getName(), message);
    }

    // Broadcast to all other planes
    this.broadcast(plane, broadcastMessage);
  }

  private broadcast(sender: Plane, message: string): void {
    this.planes.forEach((p) => {
      if (p !== sender) {
        p.notify(message);
      }
    });
  }
}

// Example usage
const controlTower = new ControlTower();

const commercial1 = new Plane(
  "Commercial Flight 101",
  PLANE_TYPE.COMMERCIAL,
  controlTower
);
const travel1 = new Plane("Private Jet 202", PLANE_TYPE.TRAVEL, controlTower);
const commercial2 = new Plane(
  "Commercial Flight 303",
  PLANE_TYPE.COMMERCIAL,
  controlTower
);

commercial1.requestTakeoff();
travel1.requestLanding();
commercial2.broadcastMessage("Weather conditions are excellent!");
