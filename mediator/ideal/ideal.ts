interface ChatMediator {
  sendDirectMessage(message: string, user: User): void;
  sendGroupMessage(message: string, user: User, group: string): void;
  createGroup(group: string): void;
  addUser(user: User, group: string): void;
}

class User {
  constructor(private name: string, private chatMediator: ChatMediator) {}
  getName(): string {
    return this.name;
  }

  sendDirectMessage(message: string, user: User): void {
    this.chatMediator.sendDirectMessage(message, user);
  }
  sendGroupMessage(message: string, group: string): void {
    this.chatMediator.sendGroupMessage(message, this, group);
  }
  receiveDirectMessage(message: string, user: User): void {
    console.log(
      `${
        this.name
      } received a direct message from ${user.getName()}: ${message}`
    );
  }
  recieveGroupMessage(message: string, group: string): void {
    console.log(
      `${this.name} received a group message in ${group}: ${message}`
    );
  }
}

class ChatManager implements ChatMediator {
  private groups: Map<string, User[]> = new Map<string, User[]>();
  constructor() {
    this.groups = new Map<string, User[]>();
  }
  sendDirectMessage(message: string, user: User): void {
    user.receiveDirectMessage(message, user);
  }
  sendGroupMessage(message: string, user: User, group: string): void {
    if (!this.groups.has(group)) {
      console.log(`Group ${group} does not exist`);
    }
    if (this.groups.has(group)) {
      this.groups.get(group)?.forEach((u: User) => {
        if (u.getName() !== user.getName()) {
          u.recieveGroupMessage(message, group);
        }
      });
    }
  }
  createGroup(group: string): void {
    if (this.groups.has(group)) {
      console.log(`Group ${group} already exists`);
    }
    this.groups.set(group, []);
  }
  addUser(user: User, group: string): void {
    if (!this.groups.has(group)) {
      console.log(`Group ${group} does not exist`);
    }
    this.groups.get(group)?.push(user);
  }
}

const friendsChat = new ChatManager();
const user1 = new User("mohamed", friendsChat);
const user2 = new User("ahmed", friendsChat);
const user3 = new User("ali", friendsChat);
const user4 = new User("salah", friendsChat);

friendsChat.createGroup("friends");
friendsChat.addUser(user1, "friends");
friendsChat.addUser(user2, "friends");
friendsChat.addUser(user3, "friends");
friendsChat.addUser(user4, "friends");
user1.sendGroupMessage("salam everyone", "friends");
user2.sendDirectMessage("how are you ali", user3);
user3.sendDirectMessage("i am fine, how are you ahmed", user2);
