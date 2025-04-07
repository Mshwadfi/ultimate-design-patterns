interface CVReportGeneration {
  readFile(filePath: string): any;
  extractData(file: any): any;
  analyzeData(data: any): any;
  generateCVReport(filePath: string): any;
}

//-------------------------------------------------------------------------------
class PdfCVReportGeneration implements CVReportGeneration {
  readFile(filePath: string): any {
    console.log(`Reading PDF file from ${filePath}`);
    return { path: filePath, type: "pdf" };
  }

  extractData(file: any): any {
    console.log(`Extracting data from PDF file: ${file.path}`);
    return { content: "PDF extracted content", source: file.path };
  }

  analyzeData(data: any): any {
    console.log("Analyzing PDF data");
    return { score: 85, keywords: ["React", "TypeScript", "Node.js"] };
  }

  generateReportOf(analyzedData: any): any {
    console.log("Generating report from analyzed PDF data");
    return {
      score: analyzedData.score,
      recommendation: analyzedData.score > 70 ? "Interview" : "Reject",
    };
  }

  generateCVReport(filePath: string): any {
    console.log(`Starting PDF CV report generation for ${filePath}`);
    const file = this.readFile(filePath);
    const data = this.extractData(file);
    const analyzedData = this.analyzeData(data);
    const report = this.generateReportOf(analyzedData);
    console.log("PDF CV report generation completed");
    return report;
  }
}
//-------------------------------------------------------------------------------
class ImageCVReportGeneration implements CVReportGeneration {
  readFile(filePath: string): any {
    console.log(`Reading image file from ${filePath}`);
    return { path: filePath, type: "image" };
  }

  extractData(file: any): any {
    console.log(`Performing OCR on image file: ${file.path}`);
    return { content: "Image OCR content", source: file.path };
  }

  analyzeData(data: any): any {
    console.log("Analyzing data extracted from image");
    return { score: 65, keywords: ["Java", "Spring", "Docker"] };
  }

  generateReportOf(analyzedData: any): any {
    console.log("Generating report from analyzed image data");
    return {
      score: analyzedData.score,
      recommendation: analyzedData.score > 70 ? "Interview" : "Reject",
    };
  }

  generateCVReport(filePath: string): any {
    console.log(`Starting image CV report generation for ${filePath}`);
    const file = this.readFile(filePath);
    const data = this.extractData(file);
    const analyzedData = this.analyzeData(data);
    const report = this.generateReportOf(analyzedData);
    console.log("Image CV report generation completed");
    return report;
  }
}
//-------------------------------------------------------------------------------
class WordCVReportGeneration implements CVReportGeneration {
  readFile(filePath: string): any {
    console.log(`Reading Word document from ${filePath}`);
    return { path: filePath, type: "word" };
  }

  extractData(file: any): any {
    console.log(`Extracting data from Word document: ${file.path}`);
    return { content: "Word document content", source: file.path };
  }

  analyzeData(data: any): any {
    console.log("Analyzing data from Word document");
    return { score: 78, keywords: ["Product Management", "Agile", "Scrum"] };
  }

  generateReportOf(analyzedData: any): any {
    console.log("Generating report from analyzed Word document data");
    return {
      score: analyzedData.score,
      recommendation: analyzedData.score > 70 ? "Interview" : "Reject",
    };
  }

  generateCVReport(filePath: string): any {
    console.log(`Starting Word CV report generation for ${filePath}`);
    const file = this.readFile(filePath);
    const data = this.extractData(file);
    const analyzedData = this.analyzeData(data);
    const report = this.generateReportOf(analyzedData);
    console.log("Word CV report generation completed");
    return report;
  }
}

//-------------------------------------------------------------------------------
const pdfProcessor = new PdfCVReportGeneration();
const imageProcessor = new ImageCVReportGeneration();
const wordProcessor = new WordCVReportGeneration();

console.log("=== Processing PDF CV ===");
const pdfReport = pdfProcessor.generateCVReport("resume.pdf");
console.log(pdfReport);

console.log("\n=== Processing Image CV ===");
const imageReport = imageProcessor.generateCVReport("resume.jpg");
console.log(imageReport);

console.log("\n=== Processing Word CV ===");
const wordReport = wordProcessor.generateCVReport("resume.docx");
console.log(wordReport);
