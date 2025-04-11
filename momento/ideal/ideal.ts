//--------------------------- TextEditorState (Memento)
class TextEditorState {
  private readonly content: string;

  constructor(content: string) {
    this.content = content;
  }

  getState(): string {
    return this.content;
  }
}

//--------------------------- TextEditorHistory (Caretaker)
class TextEditorHistory {
  private undoStack: TextEditorState[] = [];
  private redoStack: TextEditorState[] = [];

  saveState(state: TextEditorState): void {
    this.undoStack.push(state);
    this.redoStack = []; // Clear redo stack on new action
  }

  undo(currentState: TextEditorState): TextEditorState | null {
    if (this.undoStack.length === 0) return null;

    const previousState = this.undoStack.pop()!;
    this.redoStack.push(currentState);
    return previousState;
  }

  redo(currentState: TextEditorState): TextEditorState | null {
    if (this.redoStack.length === 0) return null;

    const nextState = this.redoStack.pop()!;
    this.undoStack.push(currentState);
    return nextState;
  }
}

//--------------------------- TextEditor (Originator)
class IdealTextEditor {
  private content: string = "";
  private history: TextEditorHistory = new TextEditorHistory();

  getContent(): string {
    return this.content;
  }

  setContent(newContent: string): void {
    this.content = newContent;
  }

  save(): void {
    const currentState = new TextEditorState(this.content);
    this.history.saveState(currentState);
  }

  undo(): void {
    const currentState = new TextEditorState(this.content);
    const previousState = this.history.undo(currentState);
    if (previousState) {
      this.content = previousState.getState();
    } else {
      console.warn("Nothing to undo.");
    }
  }

  redo(): void {
    const currentState = new TextEditorState(this.content);
    const nextState = this.history.redo(currentState);
    if (nextState) {
      this.content = nextState.getState();
    } else {
      console.warn("Nothing to redo.");
    }
  }
}
