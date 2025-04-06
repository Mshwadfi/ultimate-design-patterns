class User {
  private name: string;
  private notificationStrategies: INotificationStrategy[];

  constructor(name: string) {
    this.name = name;
    this.notificationStrategies = [];
  }

  addNotificationStrategy(strategy: INotificationStrategy) {
    this.notificationStrategies.push(strategy);
  }

  getName() {
    return this.name;
  }

  getNotificationStrategies() {
    return this.notificationStrategies;
  }
}

//---------------------------------------------------------
interface INotificationStrategy {
  notify(user: User, message: string): void;
}
//---------------------------------------------------------
class SmsService implements INotificationStrategy {
  notify(user: User, message: string): void {
    console.log(`user ${user.getName} recieves sms notefication: ${message}`);
  }
}
//---------------------------------------------------------
class EmailService implements INotificationStrategy {
  notify(user: User, message: string): void {
    console.log(`user ${user.getName} recieves Email notefication: ${message}`);
  }
}
//---------------------------------------------------------
class MessengerService implements INotificationStrategy {
  notify(user: User, message: string): void {
    console.log(
      `user ${user.getName} recieves Messenger notefication: ${message}`
    );
  }
}
//---------------------------------------------------------
class SlackService implements INotificationStrategy {
  notify(user: User, message: string): void {
    console.log(`user ${user.getName} recieves Slack notefication: ${message}`);
  }
}
//---------------------------------------------------------
class NoteficationSystem {
  private users: Set<User>;
  constructor() {
    this.users = new Set<User>();
  }
  addUser(user: User) {
    this.users.add(user);
  }
  removeUser(user: User) {
    this.users.delete(user);
  }

  notifyUser(user: User, message: string) {
    for (const strategy of user.getNotificationStrategies()) {
      strategy.notify(user, message);
    }
  }
}
