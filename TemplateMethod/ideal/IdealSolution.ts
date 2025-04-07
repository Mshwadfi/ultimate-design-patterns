abstract class CVReportGeneration {
  public generateCVReport(filePath: string): any {
    console.log(`Starting CV report generation for ${filePath}`);

    const file = this.readFile(filePath);
    const data = this.extractData(file);
    const analyzedData = this.analyzeData(data);
    const report = this.generateReportOf(analyzedData);

    console.log("CV report generation completed");
    return report;
  }

  // Common implementations
  public readFile(filePath: string): any {
    console.log(`Reading file from ${filePath}`);
    return { path: filePath };
  }

  public extractData(file: any): any {
    console.log(`Extracting data from file: ${file.path}`);
    return { content: "Extracted content", source: file.path };
  }

  // Abstract methods
  public abstract analyzeData(data: any): any;
  public abstract generateReportOf(analyzedData: any): any;
}

//--------------------------------------------------------------------------------------------
class PdfCVReportGenerator extends CVReportGeneration {
  public analyzeData(data: any): any {
    console.log("Analyzing PDF data");
    return { score: 85, keywords: ["React", "TypeScript", "Node.js"] };
  }

  public generateReportOf(analyzedData: any): any {
    console.log("Generating report from analyzed PDF data");
    return {
      score: analyzedData.score,
      recommendation: analyzedData.score > 70 ? "Interview" : "Reject",
    };
  }
}
//--------------------------------------------------------------------------------------------
class ImageCVReportGenerator extends CVReportGeneration {
  public analyzeData(data: any): any {
    console.log("Analyzing data extracted from image");
    return { score: 65, keywords: ["Java", "Spring", "Docker"] };
  }

  public generateReportOf(analyzedData: any): any {
    console.log("Generating report from analyzed image data");
    return {
      score: analyzedData.score,
      recommendation: analyzedData.score > 70 ? "Interview" : "Reject",
    };
  }
}

//--------------------------------------------------------------------------------------------
class WordCVReportGenerator extends CVReportGeneration {
  public analyzeData(data: any): any {
    console.log("Analyzing data from Word document");
    return { score: 78, keywords: ["Product Management", "Agile", "Scrum"] };
  }

  public generateReportOf(analyzedData: any): any {
    console.log("Generating report from analyzed Word document data");
    return {
      score: analyzedData.score,
      recommendation: analyzedData.score > 70 ? "Interview" : "Reject",
    };
  }
}

//--------------------------------------------------------------------------------------------
