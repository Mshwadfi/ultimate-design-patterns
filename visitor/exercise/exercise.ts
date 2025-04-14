// existing document system code base
interface DocumentElement {
  accept(visitor: DocumentVisitor): void;
}

class TextDocument implements DocumentElement {
  constructor(private content: string) {}

  getContent(): string {
    return this.content;
  }

  accept(visitor: DocumentVisitor): void {
    visitor.visitTextDocument(this);
  }
}

class SpreadsheetDocument implements DocumentElement {
  constructor(private sheetName: string) {}

  getSheetName(): string {
    return this.sheetName;
  }

  accept(visitor: DocumentVisitor): void {
    visitor.visitSpreadsheetDocument(this);
  }
}

class PresentationDocument implements DocumentElement {
  constructor(private slideCount: number) {}

  getSlideCount(): number {
    return this.slideCount;
  }

  accept(visitor: DocumentVisitor): void {
    visitor.visitPresentationDocument(this);
  }
}
//---------------------- added features -------------------------//
// Visitor interface
interface DocumentVisitor {
  visitTextDocument(document: TextDocument): void;
  visitSpreadsheetDocument(document: SpreadsheetDocument): void;
  visitPresentationDocument(document: PresentationDocument): void;
}

// Concrete visitor implementations
class WordCountVisitor implements DocumentVisitor {
  visitTextDocument(document: TextDocument): void {
    console.log(
      `Counting words in text document with content: "${document.getContent()}"`
    );
    console.log(`Word count operation completed for text document`);
  }

  visitSpreadsheetDocument(document: SpreadsheetDocument): void {
    console.log(`Counting words in spreadsheet: ${document.getSheetName()}`);
    console.log(`Word count operation completed for spreadsheet`);
  }

  visitPresentationDocument(document: PresentationDocument): void {
    console.log(
      `Counting words across ${document.getSlideCount()} slides in presentation`
    );
    console.log(`Word count operation completed for presentation`);
  }
}

class TextExtractionVisitor implements DocumentVisitor {
  visitTextDocument(document: TextDocument): void {
    console.log(
      `Extracting text from text document: "${document.getContent()}"`
    );
    console.log(`Text extraction completed for text document`);
  }

  visitSpreadsheetDocument(document: SpreadsheetDocument): void {
    console.log(
      `Extracting text from cells in spreadsheet: ${document.getSheetName()}`
    );
    console.log(`Text extraction completed for spreadsheet`);
  }

  visitPresentationDocument(document: PresentationDocument): void {
    console.log(
      `Extracting text from ${document.getSlideCount()} slides in presentation`
    );
    console.log(`Text extraction completed for presentation`);
  }
}

class FormattingAnalysisVisitor implements DocumentVisitor {
  visitTextDocument(document: TextDocument): void {
    console.log(
      `Analyzing formatting in text document: "${document.getContent()}"`
    );
    console.log(`Formatting analysis completed for text document`);
  }

  visitSpreadsheetDocument(document: SpreadsheetDocument): void {
    console.log(
      `Analyzing cell formatting in spreadsheet: ${document.getSheetName()}`
    );
    console.log(`Formatting analysis completed for spreadsheet`);
  }

  visitPresentationDocument(document: PresentationDocument): void {
    console.log(
      `Analyzing slide formatting in ${document.getSlideCount()} slides`
    );
    console.log(`Formatting analysis completed for presentation`);
  }
}
