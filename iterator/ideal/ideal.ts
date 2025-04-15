interface EmployeeHierarchyIterator {
  getNext(): Employee | null;
  hasNext(): boolean;
}

interface IterableCollection {
  createEmployeeDirectReporterIterator(): EmployeeHierarchyIterator;
  createEmployeeDirectCoworkerIterator(): EmployeeHierarchyIterator;
}

class EmployeeHierarchyCollection implements IterableCollection {
  constructor(public employeeId: string, public employees: Employee[]) {}

  createEmployeeDirectReporterIterator(): EmployeeHierarchyIterator {
    return new EmployeeDirectReportIterator(this);
  }

  createEmployeeDirectCoworkerIterator(): EmployeeHierarchyIterator {
    return new EmployeeCoWorkersIterator(this);
  }
}

class EmployeeDirectReportIterator implements EmployeeHierarchyIterator {
  private directReports: Employee[];
  private index = 0;

  constructor(private employeeHierarchy: EmployeeHierarchyCollection) {
    this.directReports = this.employeeHierarchy.employees.filter(
      (emp) => emp.managerId === this.employeeHierarchy.employeeId
    );
  }

  getNext(): Employee | null {
    if (this.hasNext()) return this.directReports[this.index++];
    return null;
  }

  hasNext(): boolean {
    return this.index < this.directReports.length;
  }
}

class EmployeeCoWorkersIterator implements EmployeeHierarchyIterator {
  private coWorkers: Employee[];
  private index = 0;

  constructor(private employeeHierarchy: EmployeeHierarchyCollection) {
    const current = this.employeeHierarchy.employees.find(
      (emp) => emp.id === this.employeeHierarchy.employeeId
    );
    this.coWorkers = this.employeeHierarchy.employees.filter(
      (emp) => emp.managerId === current?.managerId && emp.id !== current?.id
    );
  }

  getNext(): Employee | null {
    if (this.hasNext()) return this.coWorkers[this.index++];
    return null;
  }

  hasNext(): boolean {
    return this.index < this.coWorkers.length;
  }
}
