/**
 * Memento class to store drawer state
 */
class DrawerMemento {
  private content: string;

  constructor(content: string) {
    this.content = content;
  }

  getContent(): string {
    return this.content;
  }
}

/**
 * Caretaker class that manages history
 */
class DrawerHistory {
  private undoStack: DrawerMemento[] = [];
  private redoStack: DrawerMemento[] = [];

  save(memento: DrawerMemento): void {
    this.undoStack.push(memento);
    this.redoStack = [];
  }

  undo(): DrawerMemento | null {
    if (this.undoStack.length === 0) {
      return null;
    }

    const currentState = this.undoStack.pop()!;
    this.redoStack.push(currentState);

    return currentState;
  }

  redo(): DrawerMemento | null {
    if (this.redoStack.length === 0) {
      return null;
    }

    const nextState = this.redoStack.pop()!;
    this.undoStack.push(nextState);
    return nextState;
  }
}

/**
 * Originator class
 */
class Drawer {
  private content: string;
  private history: DrawerHistory;

  constructor() {
    this.content = "";
    this.history = new DrawerHistory();
    // Save initial state
    this.save();
  }

  getContent(): string {
    return this.content;
  }

  setContent(content: string): void {
    this.content = content;
  }

  save(): void {
    const memento = new DrawerMemento(this.content);
    this.history.save(memento);
  }

  undo(): boolean {
    const previousState = this.history.undo();
    if (previousState) {
      this.content = previousState.getContent();
      return true;
    }
    return false;
  }

  redo(): boolean {
    const nextState = this.history.redo();
    if (nextState) {
      this.content = nextState.getContent();
      return true;
    }
    return false;
  }
}
