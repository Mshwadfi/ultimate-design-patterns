// this is not the extreme naive solution, you may get a much worse solution😂
interface INotification {
  getContent(): string;
  setContent(content: string): void;

  getSender(): string;
  setSender(sender: string): void;

  getRecipient(): string;
  setRecipient(recipient: string): void;

  getTimestamp(): string;
  setTimestamp(timestamp: string): void;
}

class MessengerNotification implements INotification {
  private content: string = "";
  private sender: string = "";
  private recipient: string = "";
  private timestamp: string = "";
  private attachments: string[] = [];
  private theme: string = "";

  getContent(): string {
    return this.content;
  }
  setContent(content: string): void {
    this.content = content;
  }

  getSender(): string {
    return this.sender;
  }
  setSender(sender: string): void {
    this.sender = sender;
  }

  getRecipient(): string {
    return this.recipient;
  }
  setRecipient(recipient: string): void {
    this.recipient = recipient;
  }

  getTimestamp(): string {
    return this.timestamp;
  }
  setTimestamp(timestamp: string): void {
    this.timestamp = timestamp;
  }

  getAttachments(): string[] {
    return this.attachments;
  }
  setAttachments(attachments: string[]): void {
    this.attachments = attachments;
  }

  getTheme(): string {
    return this.theme;
  }
  setTheme(theme: string): void {
    this.theme = theme;
  }
}

class SlackNotification implements INotification {
  private content: string = "";
  private sender: string = "";
  private recipient: string = "";
  private timestamp: string = "";
  private attachments: string[] = [];
  private hasMarkdown: boolean = false;

  getContent(): string {
    return this.content;
  }
  setContent(content: string): void {
    this.content = content;
  }

  getSender(): string {
    return this.sender;
  }
  setSender(sender: string): void {
    this.sender = sender;
  }

  getRecipient(): string {
    return this.recipient;
  }
  setRecipient(recipient: string): void {
    this.recipient = recipient;
  }

  getTimestamp(): string {
    return this.timestamp;
  }
  setTimestamp(timestamp: string): void {
    this.timestamp = timestamp;
  }

  getAttachments(): string[] {
    return this.attachments;
  }
  setAttachments(attachments: string[]): void {
    this.attachments = attachments;
  }

  getHasMarkdown(): boolean {
    return this.hasMarkdown;
  }
  setHasMarkdown(value: boolean): void {
    this.hasMarkdown = value;
  }
}

// example usage
const messenger = new MessengerNotification();
messenger.setContent("Hello from Messenger!");
messenger.setTheme("Dark");

console.log("Messenger:", messenger.getContent(), messenger.getTheme());

const slack = new SlackNotification();
slack.setContent("Hello from Messenger!");
slack.setHasMarkdown(true);

console.log("Slack:", slack.getContent(), slack.getHasMarkdown());
