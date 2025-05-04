class Door {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  open(): void {
    console.log(`${this.name} is opened`);
  }
  close(): void {
    console.log(`${this.name} is closed`);
  }
}

class Light {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  turnOn(): void {
    console.log(`${this.name} is turned on`);
  }
  turnOff(): void {
    console.log(`${this.name} is turned off`);
  }
}

class Tv {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  turnOn(): void {
    console.log(`${this.name} is turned on`);
  }
  turnOff(): void {
    console.log(`${this.name} is turned off`);
  }
}

class SmartHomeApplication {
  private door: Door;
  private light: Light;
  private tv: Tv;

  constructor(door: Door, light: Light, tv: Tv) {
    this.door = door;
    this.light = light;
    this.tv = tv;
  }

  openDoor(): void {
    this.door.open();
  }

  closeDoor(): void {
    this.door.close();
  }

  turnOnLight(): void {
    this.light.turnOn();
  }

  turnOffLight(): void {
    this.light.turnOff();
  }

  turnOnTv(): void {
    this.tv.turnOn();
  }

  turnOffTv(): void {
    this.tv.turnOff();
  }
}

class SmartHomeMoobileApp extends SmartHomeApplication {
  constructor(door: Door, light: Light, tv: Tv) {
    super(door, light, tv);
  }

  openDoor(): void {
    console.log("Opening door from mobile app...");
    super.openDoor();
  }

  closeDoor(): void {
    console.log("Closing door from mobile app...");
    super.closeDoor();
  }

  turnOnLight(): void {
    console.log("Turning on light from mobile app...");
    super.turnOnLight();
  }

  turnOffLight(): void {
    console.log("Turning off light from mobile app...");
    super.turnOffLight();
  }

  turnOnTv(): void {
    console.log("Turning on TV from mobile app...");
    super.turnOnTv();
  }

  turnOffTv(): void {
    console.log("Turning off TV from mobile app...");
    super.turnOffTv();
  }
}

class SmartHomeVoiceAssistant extends SmartHomeApplication {
  constructor(door: Door, light: Light, tv: Tv) {
    super(door, light, tv);
  }
  say(command: string): void {
    console.log(`Voice command: ${command}`);
    if (command === "open door") {
      this.openDoor();
    } else if (command === "close door") {
      this.closeDoor();
    } else if (command === "turn on light") {
      this.turnOnLight();
    } else if (command === "turn off light") {
      this.turnOffLight();
    } else if (command === "turn on tv") {
      this.turnOnTv();
    } else if (command === "turn off tv") {
      this.turnOffTv();
    } else {
      console.log("Unknown command");
    }
  }
}

class SmartHomeShortCut extends SmartHomeApplication {
  constructor(door: Door, light: Light, tv: Tv) {
    super(door, light, tv);
  }
  shortcut(command: string): void {
    console.log(`Shortcut command: ${command}`);
    if (command === "all on") {
      this.turnOnLight();
      this.turnOnTv();
    } else if (command === "all off") {
      this.turnOffLight();
      this.turnOffTv();
    } else if (command === "Open door") {
      this.openDoor();
    } else if (command === "Close door") {
      this.closeDoor();
    } else {
      console.log("Unknown command");
    }
  }
}

const door = new Door("Front Door");
const light = new Light("Living Room Light");
const tv = new Tv("Living Room TV");
const smartHomeApp = new SmartHomeApplication(door, light, tv);
const smartHomeMobileApp = new SmartHomeMoobileApp(door, light, tv);
const smartHomeVoiceAssistant = new SmartHomeVoiceAssistant(door, light, tv);
const smartHomeShortCut = new SmartHomeShortCut(door, light, tv);

smartHomeApp.openDoor();
smartHomeApp.closeDoor();
smartHomeMobileApp.turnOnLight();
smartHomeMobileApp.turnOffLight();
smartHomeVoiceAssistant.say("turn on tv");
smartHomeVoiceAssistant.say("turn off tv");
