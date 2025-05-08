class TextEditorState {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  getText(): string {
    return this.text;
  }

  setText(text: string): void {
    this.text = text;
  }
}

class TextEditorHistory {
  private pevStates: TextEditorState[] = [];
  private nextStates: TextEditorState[] = [];
  constructor() {
    this.pevStates = [];
    this.nextStates = [];
  }

  saveState(state: TextEditorState): void {
    this.pevStates.push(state);
    this.nextStates = []; // Clear the redo stack
  }
  undo(currentState: TextEditorState): TextEditorState | null {
    if (this.pevStates.length === 0) return null;
    const state = this.pevStates.pop()!;
    this.nextStates.push(currentState);
    return state;
  }
  redo(currentState: TextEditorState): TextEditorState | null {
    if (this.nextStates.length === 0) return null;
    const state = this.nextStates.pop()!;
    this.pevStates.push(currentState);
    return state;
  }
}

interface TextEditorCommand {
  execute(): void;
  undo(): void;
}

class CopyCommand implements TextEditorCommand {
  private textEditor: TextEditor;
  private copiedText: string | null = null;

  constructor(textEditor: TextEditor) {
    this.textEditor = textEditor;
  }

  execute(): void {
    this.copiedText = this.textEditor.getText();
    console.log(`Copied: ${this.copiedText}`);
  }

  undo(): void {
    if (this.copiedText) {
      console.log(`Undo copy: ${this.copiedText}`);
      this.copiedText = null;
    }
  }
}
class PasteCommand implements TextEditorCommand {
  private textEditor: TextEditor;
  private pastedText: string | null = null;

  constructor(textEditor: TextEditor) {
    this.textEditor = textEditor;
  }

  execute(): void {
    this.pastedText = this.textEditor.getText();
    console.log(`Pasted: ${this.pastedText}`);
  }

  undo(): void {
    if (this.pastedText) {
      console.log(`Undo paste: ${this.pastedText}`);
      this.pastedText = null;
    }
  }
}

class TextEditor {
  private text: string;
  private history: TextEditorHistory;

  constructor() {
    this.text = "";
    this.history = new TextEditorHistory();
  }

  setText(text: string): void {
    this.history.saveState(new TextEditorState(this.text));
    this.text = text;
  }

  getText(): string {
    return this.text;
  }
  undo(): void {
    const currentState = new TextEditorState(this.text);
    const state = this.history.undo(currentState);
    if (state) {
      this.text = state.getText();
    }
  }
  redo(): void {
    const currentState = new TextEditorState(this.text);
    const state = this.history.redo(currentState);
    if (state) {
      this.text = state.getText();
    }
  }
}

const editor = new TextEditor();
editor.setText("Salam, everyone!");
console.log(editor.getText()); // Salam, everyone!
editor.setText("Hello, world!");
console.log(editor.getText()); // Hello, world!
editor.undo();
console.log(editor.getText()); // Salam, everyone!
editor.redo();
console.log(editor.getText()); // Hello, world!
editor.setText("Goodbye, world!");
console.log(editor.getText()); // Goodbye, world!
editor.undo();
console.log(editor.getText()); // Hello, world!

const copyCommand = new CopyCommand(editor);
copyCommand.execute(); // Copied: Hello, world!
copyCommand.undo(); // Undo copy: Hello, world!
const pasteCommand = new PasteCommand(editor);
pasteCommand.execute(); // Pasted: Hello, world!
pasteCommand.undo(); // Undo paste: Hello, world!
