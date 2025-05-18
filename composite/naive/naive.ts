class Employee {
  private name: string;
  private salary: number;

  constructor(name: string, salary: number) {
    this.name = name;
    this.salary = salary;
  }

  getSalary(): number {
    return this.salary;
  }
}

class Department {
  private employees: Employee[] = [];
  private subDepartments: Department[] = [];

  constructor() {}

  addEmploye(employee: Employee) {
    this.employees.push(employee);
  }
  addSubDepartment(subDepartment: Department) {
    this.subDepartments.push(subDepartment);
  }

  claculateTotalSalaries() {
    const totalEmployeesSalaries = this.employees.reduce(
      (acc, emp) => acc + emp.getSalary(),
      0
    );
    const totalSubDepartmentsSalaries = this.subDepartments?.reduce(
      (acc, subDep) => acc + subDep.claculateTotalSalaries(),
      0
    );

    return totalEmployeesSalaries + totalSubDepartmentsSalaries;
  }
}

const hrDepartment = new Department();
hrDepartment.addEmploye(new Employee("Ahmed", 10000));
hrDepartment.addEmploye(new Employee("Ali", 12000));

const engineeringDepartment = new Department();
engineeringDepartment.addEmploye(new Employee("Muhammad", 20000));

hrDepartment.addSubDepartment(engineeringDepartment);

console.log(hrDepartment.claculateTotalSalaries());
console.log(engineeringDepartment.claculateTotalSalaries());
