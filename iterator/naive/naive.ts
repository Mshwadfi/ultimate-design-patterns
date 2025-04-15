class Employee {
  constructor(public id: string, public managerId: string) {}
}

class EmployeeHierarchyCollection {
  private employees: Employee[];
  private employeeId: string;

  constructor(employeeId: string, employees: Employee[]) {
    this.employeeId = employeeId;
    this.employees = employees;
  }

  // --- Direct Reports ---
  getNextEmployeeDirectReport(): Employee | null {
    const index = this.employees.findIndex(
      (emp) => emp.managerId === this.employeeId
    );
    if (index !== -1) return this.employees.splice(index, 1)[0];
    return null;
  }

  hasNextEmployeeDirectReport(): boolean {
    return this.employees.some((emp) => emp.managerId === this.employeeId);
  }

  // --- Co-workers ---
  getNextEmployeeCoWorker(): Employee | null {
    const current = this.employees.find((emp) => emp.id === this.employeeId);
    if (!current) return null;
    const index = this.employees.findIndex(
      (emp) => emp.managerId === current.managerId && emp.id !== this.employeeId
    );
    if (index !== -1) return this.employees.splice(index, 1)[0];
    return null;
  }

  hasNextEmployeeCoWorker(): boolean {
    const current = this.employees.find((emp) => emp.id === this.employeeId);
    return this.employees.some(
      (emp) =>
        emp.managerId === current?.managerId && emp.id !== this.employeeId
    );
  }

  // --- Subordinates (Any level) ---
  getNextEmployeeSubOrdinate(): Employee | null {
    const queue: Employee[] = [
      this.employees.find((e) => e.id === this.employeeId)!,
    ];
    while (queue.length) {
      const current = queue.shift()!;
      const children = this.employees.filter(
        (emp) => emp.managerId === current.id
      );
      queue.push(...children);
      const index = this.employees.findIndex(
        (emp) => emp.managerId === current.id
      );
      if (index !== -1) return this.employees.splice(index, 1)[0];
    }
    return null;
  }

  hasNextEmployeeSubOrdinate(): boolean {
    const checkSub = (id: string): boolean => {
      const subs = this.employees.filter((e) => e.managerId === id);
      if (subs.length > 0) return true;
      return subs.some((sub) => checkSub(sub.id));
    };
    return checkSub(this.employeeId);
  }
}
