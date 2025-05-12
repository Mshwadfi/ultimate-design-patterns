interface ReprtGenerator {
  generateReport(): object;
}

class ThirdPartyReportApi {
  generateReport() {
    console.log("generating report...");
    return "report in csv format";
  }
}

class LegacyReportService {
  private thirdPartyReportApi: ThirdPartyReportApi;
  constructor(thirdPartyReportApi: ThirdPartyReportApi) {
    this.thirdPartyReportApi = thirdPartyReportApi;
  }

  generateReport() {
    return this.thirdPartyReportApi.generateReport();
  }
}

class ReportAdapter implements ReprtGenerator {
  private legacyReportService: LegacyReportService;
  constructor(legacyReportService: LegacyReportService) {
    this.legacyReportService = legacyReportService;
  }

  generateReport() {
    console.log("generating report...");
    const csv = this.legacyReportService.generateReport();
    console.log("converting csv to json...");
    return { report: "json report" };
  }
}

const ReportGeneratorApi = new ThirdPartyReportApi();
const csvReportGenerator = new LegacyReportService(ReportGeneratorApi);
const jsonReportGenerator = new ReportAdapter(csvReportGenerator);

console.log(csvReportGenerator.generateReport());
console.log(jsonReportGenerator.generateReport());
