interface ScheduleManagment {
  generateReport(): void;
  calculateOverTime(): void;
  manageLeaveRequst(): void;
}

class DayTimeEmployee implements ScheduleManagment {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  generateReport(): void {
    console.log("generating report for day time employee");
  }
  calculateOverTime(): void {
    console.log("calculating overtime for day time employee");
  }
  manageLeaveRequst(): void {
    console.log("manage leave requests for day time employee");
  }
}

class NightEmployee implements ScheduleManagment {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  generateReport(): void {
    console.log("generating report for night shift employee");
  }
  calculateOverTime(): void {
    console.log("calculating overtime for night shift employee");
  }
  manageLeaveRequst(): void {
    console.log("manage leave requests for night shift employee");
  }
}

class RemoteEmployee implements ScheduleManagment {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  generateReport(): void {
    console.log("generating report for remote employee");
  }
  calculateOverTime(): void {
    console.log("calculating overtime for remote employee");
  }
  manageLeaveRequst(): void {
    console.log("manage leave requests for remote employee");
  }
}
