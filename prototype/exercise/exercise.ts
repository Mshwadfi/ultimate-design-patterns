abstract class Button {
  private color: string;
  private content: string;
  private xPosition: number;
  private yPosition: number;

  constructor(
    color: string,
    content: string,
    xPosition: number,
    yPosition: number
  ) {
    this.color = color;
    this.content = content;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
  }

  getColor() {
    return this.color;
  }
  getContent() {
    return this.content;
  }
  getXposition() {
    return this.xPosition;
  }
  getYposition() {
    return this.yPosition;
  }

  setColor(color: string) {
    this.color = color;
    return this;
  }
  setContent(content: string) {
    this.content = content;
    return this;
  }
  setXposition(xPosition: number) {
    this.xPosition = xPosition;
    return this;
  }
  setYposition(yPosition: number) {
    this.yPosition = yPosition;
    return this;
  }

  public print() {
    console.log(`color: ${this.color}`);
    console.log(`content: ${this.content}`);
    console.log(`coordinates: ${this.xPosition} ${this.yPosition}`);
  }

  abstract clone(
    color?: string,
    content?: string,
    xPosition?: number,
    yPosition?: number
  ): Button;
}

class Submit extends Button {
  constructor(
    color: string,
    content: string,
    xPosition: number,
    yPosition: number
  ) {
    super(color, content, xPosition, yPosition);
  }

  clone(
    color?: string,
    content?: string,
    xPosition?: number,
    yPosition?: number
  ): Submit {
    return new Submit(
      color ?? this.getColor(),
      content ?? this.getContent(),
      xPosition ?? this.getXposition(),
      yPosition ?? this.getYposition()
    );
  }
}

const submit = new Submit("red", "submit", 12, 12);
const create = submit.clone().setColor("green").setContent("create");
