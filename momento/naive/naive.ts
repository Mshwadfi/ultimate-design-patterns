class TextEditor {
  private content: string;
  private prevStat: string[];
  private nextStat: string[];

  constructor() {
    this.content = "";
    this.prevStat = [];
    this.nextStat = [];
  }

  undo(): string | null {
    if (this.prevStat.length !== 0) {
      this.nextStat.push(this.content);
      this.content = this.prevStat.pop()!;
      return this.content;
    }
    return null;
  }

  redo(): string | null {
    if (this.nextStat.length !== 0) {
      this.prevStat.push(this.content);
      this.content = this.nextStat.pop()!;
      return this.content;
    }
    return null;
  }

  save(): void {
    this.prevStat.push(this.content);
    this.nextStat = [];
  }

  getContent(): string {
    return this.content;
  }

  setContent(content: string): void {
    this.content = content;
  }
}
