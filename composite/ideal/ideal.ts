interface OrganizationUnit {
  calculateTotalSalary(): number;
}

class Employee implements OrganizationUnit {
  private name: string;
  private salary: number;
  constructor(name: string, salary: number) {
    this.name = name;
    this.salary = salary;
  }
  calculateTotalSalary(): number {
    return this.salary;
  }
}

class Department implements OrganizationUnit {
  private organisationUnits: OrganizationUnit[] = [];

  constructor() {}
  addOrganisationUnit(organisationUnit: OrganizationUnit) {
    this.organisationUnits.push(organisationUnit);
  }
  calculateTotalSalary(): number {
    const totalSalaries = this.organisationUnits?.reduce(
      (acc, unit) => acc + unit.calculateTotalSalary(),
      0
    );

    return totalSalaries;
  }
}

const hr = new Department();
hr.addOrganisationUnit(new Employee("Ahmed", 10000));
hr.addOrganisationUnit(new Employee("Ali", 12000));

const engineering = new Department();
engineering.addOrganisationUnit(new Employee("Muhammad", 20000));

const company = new Department();
company.addOrganisationUnit(hr);
company.addOrganisationUnit(engineering);

console.log("HR Department Salary:", hr.calculateTotalSalary());
console.log(
  "Engineering Department Salary:",
  engineering.calculateTotalSalary()
);
console.log("Company Total Salary:", company.calculateTotalSalary());
