interface INotificationBuilder {
  setContent(content: string): this;
  setSender(sender: string): this;
  setRecipient(recipient: string): this;
  setTimestamp(timestamp: string): this;
}

class MessengerNotification {
  constructor(
    private readonly content: string,
    private readonly sender: string,
    private readonly recipient: string,
    private readonly timestamp: string
  ) {}

  getContent(): string {
    return this.content;
  }
  getSender(): string {
    return this.sender;
  }
  getRecipient(): string {
    return this.recipient;
  }
  getTimestamp(): string {
    return this.timestamp;
  }
}

class SlackNotification {
  constructor(
    private readonly content: string,
    private readonly sender: string,
    private readonly recipient: string,
    private readonly timestamp: string,
    private readonly hasMarkdown: boolean = false
  ) {}

  getContent(): string {
    return this.content;
  }
  getSender(): string {
    return this.sender;
  }
  getRecipient(): string {
    return this.recipient;
  }
  getTimestamp(): string {
    return this.timestamp;
  }
}

class MessengerNotificationBuilder implements INotificationBuilder {
  private content = "";
  private sender = "";
  private recipient = "";
  private timestamp = "";
  setContent(content: string) {
    this.content = content;
    return this;
  }
  setSender(sender: string) {
    this.sender = sender;
    return this;
  }
  setRecipient(recipient: string) {
    this.recipient = recipient;
    return this;
  }
  setTimestamp(timestamp: string) {
    this.timestamp = timestamp;
    return this;
  }

  build() {
    return new MessengerNotification(
      this.content,
      this.sender,
      this.recipient,
      this.timestamp
    );
  }
}

class SlackNotificationBuilder implements INotificationBuilder {
  private content = "";
  private sender = "";
  private recipient = "";
  private timestamp = "";
  private hasMarkdown = false;
  setContent(content: string) {
    this.content = content;
    return this;
  }
  setSender(sender: string) {
    this.sender = sender;
    return this;
  }
  setRecipient(recipient: string) {
    this.recipient = recipient;
    return this;
  }
  setTimestamp(timestamp: string) {
    this.timestamp = timestamp;
    return this;
  }

  setHasMarkdown(value: boolean) {
    this.hasMarkdown = value;
    return this;
  }
  build() {
    return new SlackNotification(
      this.content,
      this.sender,
      this.recipient,
      this.timestamp,
      this.hasMarkdown
    );
  }
}

// Example usage
const messangerNotification = new MessengerNotificationBuilder()
  .setContent("Salam!")
  .setRecipient("Ali")
  .setSender("Hassan")
  .setTimestamp("2023-10-01 12:00")
  .build();

const slackNotification = new SlackNotificationBuilder()
  .setContent("Hello!")
  .setRecipient("Team")
  .setSender("Manager")
  .setTimestamp("2023-10-01 12:00")
  .setHasMarkdown(true)
  .build();

console.log(messangerNotification.getContent());
console.log(slackNotification.getContent());
