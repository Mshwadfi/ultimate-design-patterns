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
class TV {
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

class AirConditioner {
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

interface Command {
  execute(): void;
}

class OpenDoorCommand implements Command {
  private door: Door;
  constructor(door: Door) {
    this.door = door;
  }
  execute(): void {
    this.door.open();
  }
}

class CloseDoorCommand implements Command {
  private door: Door;
  constructor(door: Door) {
    this.door = door;
  }
  execute(): void {
    this.door.close();
  }
}
class TurnOnLightCommand implements Command {
  private light: Light;
  constructor(light: Light) {
    this.light = light;
  }
  execute(): void {
    this.light.turnOn();
  }
}
class TurnOffLightCommand implements Command {
  private light: Light;
  constructor(light: Light) {
    this.light = light;
  }
  execute(): void {
    this.light.turnOff();
  }
}
class TurnOnTVCommand implements Command {
  private tv: TV;
  constructor(tv: TV) {
    this.tv = tv;
  }
  execute(): void {
    this.tv.turnOn();
  }
}
class TurnOffTVCommand implements Command {
  private tv: TV;
  constructor(tv: TV) {
    this.tv = tv;
  }
  execute(): void {
    this.tv.turnOff();
  }
}

class TurnOnAirConditionerCommand implements Command {
  private airConditioner: AirConditioner;
  constructor(airConditioner: AirConditioner) {
    this.airConditioner = airConditioner;
  }
  execute(): void {
    this.airConditioner.turnOn();
  }
}
class TurnOffAirConditionerCommand implements Command {
  private airConditioner: AirConditioner;
  constructor(airConditioner: AirConditioner) {
    this.airConditioner = airConditioner;
  }
  execute(): void {
    this.airConditioner.turnOff();
  }
}

class SmartHomeMobileApp {
  executeCommand(command: Command): void {
    command.execute();
  }
}

class SmartHomeVoiceAssistant {
  private commands: Map<string, Command>;
  constructor() {
    this.commands = new Map<string, Command>();
  }
  registerCommand(commandName: string, command: Command): void {
    this.commands.set(commandName, command);
  }

  executeCommand(commandName: string): void {
    const command = this.commands.get(commandName);
    if (command) {
      command.execute();
    } else {
      console.log(`Command ${commandName} not found`);
    }
  }
}

class SmartHomeShortCuts {
  private shortcuts: Map<string, Command>;
  constructor() {
    this.shortcuts = new Map<string, Command>();
  }
  registerShortcut(shortcutName: string, command: Command): void {
    this.shortcuts.set(shortcutName, command);
  }

  executeShortcut(shortcutName: string): void {
    const command = this.shortcuts.get(shortcutName);
    if (command) {
      command.execute();
    } else {
      console.log(`Shortcut ${shortcutName} not found`);
    }
  }
}

// Example usage
const door = new Door("Front Door");
const light = new Light("Living Room Light");
const tv = new TV("Living Room TV");
const airConditioner = new AirConditioner("Bed Room Air Conditioner");
const openDoorCommand = new OpenDoorCommand(door);
const closeDoorCommand = new CloseDoorCommand(door);
const turnOnLightCommand = new TurnOnLightCommand(light);
const turnOffLightCommand = new TurnOffLightCommand(light);
const turnOnTVCommand = new TurnOnTVCommand(tv);
const turnOffTVCommand = new TurnOffTVCommand(tv);
const turnOnAirConditionerCommand = new TurnOnAirConditionerCommand(
  airConditioner
);
const turnOffAirConditionerCommand = new TurnOffAirConditionerCommand(
  airConditioner
);

console.log("mobile app");
const mobileApp = new SmartHomeMobileApp();
mobileApp.executeCommand(openDoorCommand);
mobileApp.executeCommand(closeDoorCommand);
console.log("voice assistant");
const voiceAssistant = new SmartHomeVoiceAssistant();
voiceAssistant.registerCommand("turnOnLight", turnOffLightCommand);
voiceAssistant.registerCommand("turnOffLight", turnOnLightCommand);
voiceAssistant.executeCommand("turnOnLight");
voiceAssistant.executeCommand("turnOffLight");
console.log("shortcuts");
const shortCuts = new SmartHomeShortCuts();
shortCuts.registerShortcut("turnOnTV", turnOnTVCommand);
shortCuts.registerShortcut("turnOffTV", turnOffTVCommand);
shortCuts.executeShortcut("turnOnTV");
shortCuts.executeShortcut("turnOffTV");
shortCuts.registerShortcut("turnOnAirConditioner", turnOnAirConditionerCommand);
shortCuts.registerShortcut(
  "turnOffAirConditioner",
  turnOffAirConditionerCommand
);
shortCuts.executeShortcut("turnOnAirConditioner");
shortCuts.executeShortcut("turnOffAirConditioner");
