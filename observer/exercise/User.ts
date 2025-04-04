import { ISubscriber } from "../ideal_solution/Isubscriber";

class User implements ISubscriber {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }

  notify(message: string): void {
    console.log(`${this.name} recieve message: ${message}`);
  }
}
