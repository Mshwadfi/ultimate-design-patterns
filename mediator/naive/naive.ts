class User {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  getName(): string {
    return this.name;
  }
  sendMessageToUser(message: string, user: User): void {
    console.log(
      `Sending message "${message}" from ${this.name} to ${user.getName()}`
    );
    user.recieveMessage(message, this);
  }
  sendMessageToGroup(message: string, group: Group): void {
    console.log(
      `Sending message "${message}" from ${
        this.name
      } to group ${group.getName()}`
    );
    group.recieveMessage(message, this);
  }
  recieveMessage(message: string, user: User): void {
    console.log(
      `User ${this.name} received message "${message}" from ${user.getName()}`
    );
  }
  recieveMessageFromGroup(message: string, group: Group): void {
    console.log(
      `User ${
        this.name
      } received message "${message}" from group ${group.getName()}`
    );
  }
}

class Group {
  private groupName: string;
  private users: User[] = [];
  constructor(groupName: string) {
    this.groupName = groupName;
  }
  getName(): string {
    return this.groupName;
  }
  addUser(user: User): void {
    this.users.push(user);
  }
  recieveMessage(message: string, sender: User): void {
    console.log(
      `Group ${
        this.groupName
      } received message "${message}" from ${sender.getName()}`
    );
    this.users.forEach((u) => {
      if (u !== sender) {
        u.sendMessageToUser(message, sender);
      }
    });
  }
}

const user1 = new User("ali");
const user2 = new User("ahmad");
const user3 = new User("sara");

const group1 = new Group("Work group");

group1.addUser(user1);
group1.addUser(user2);
group1.addUser(user3);

user1.sendMessageToUser("Salam, Ahmad!", user2);
user1.sendMessageToGroup("Salam, everyone!", group1);
