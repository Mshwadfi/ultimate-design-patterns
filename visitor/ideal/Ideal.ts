// Core system interface with accept methode that accepts visitor
interface IScheduleManagement {
  generateReport(): void;
  calculateOverTime(): void;
  accept<T>(visitor: IScheduleManagementVisitor<T>): T;
}

// visitor interface with generic return values
interface IScheduleManagementVisitor<T> {
  visitDayShift(employee: DayTimeShiftEmployee): T;
  visitNightShift(employee: NightShiftEmployee): T;
  visitRemoteShift(employee: RemoteShiftEmployee): T;
}

//leave request model
interface LeaveRequest {
  startDate: Date;
  endDate: Date;
  reason: string;
  status: "pending" | "approved" | "rejected";
}

// visitor concrete class
class ManageLeaveRequestVisitor implements IScheduleManagementVisitor<boolean> {
  private leaveRequest: LeaveRequest;

  constructor(leaveRequest: LeaveRequest) {
    this.leaveRequest = leaveRequest;
  }

  visitDayShift(employee: DayTimeShiftEmployee): boolean {
    console.log(
      `Processing leave request for day shift employee: ${employee.name}`
    );
    // logic for proccess leave request based on num of days
    const daysRequested = this.calculateDaysRequested();
    const isApproved = this.processDayShiftLeavePolicy(daysRequested);
    return isApproved;
  }

  visitNightShift(employee: NightShiftEmployee): boolean {
    console.log(
      `Processing leave request for night shift employee: ${employee.name}`
    );
    const daysRequested = this.calculateDaysRequested();
    const isApproved = this.processNightShiftLeavePolicy(daysRequested);
    return isApproved;
  }

  visitRemoteShift(employee: RemoteShiftEmployee): boolean {
    console.log(
      `Processing leave request for remote employee: ${employee.name}`
    );
    const daysRequested = this.calculateDaysRequested();
    const isApproved = this.processRemoteLeavePolicy(daysRequested);
    return isApproved;
  }

  private calculateDaysRequested(): number {
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.round(
      (this.leaveRequest.endDate.getTime() -
        this.leaveRequest.startDate.getTime()) /
        msPerDay
    );
  }

  private processDayShiftLeavePolicy(days: number): boolean {
    return days <= 10;
  }

  private processNightShiftLeavePolicy(days: number): boolean {
    return days <= 7;
  }

  private processRemoteLeavePolicy(days: number): boolean {
    return days <= 15;
  }
}

// Base employee class to avoid code duplication
abstract class Employee implements IScheduleManagement {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  abstract generateReport(): void;
  abstract calculateOverTime(): void;
  abstract accept<T>(visitor: IScheduleManagementVisitor<T>): T;
}

// Concrete employee classes
class DayTimeShiftEmployee extends Employee {
  generateReport(): void {
    console.log(`Generating report for day time employee: ${this.name}`);
  }

  calculateOverTime(): void {
    console.log(`Calculating overtime for day time employee: ${this.name}`);
  }

  accept<T>(visitor: IScheduleManagementVisitor<T>): T {
    return visitor.visitDayShift(this);
  }
}

class NightShiftEmployee extends Employee {
  generateReport(): void {
    console.log(`Generating report for night shift employee: ${this.name}`);
  }

  calculateOverTime(): void {
    console.log(`Calculating overtime for night shift employee: ${this.name}`);
  }

  accept<T>(visitor: IScheduleManagementVisitor<T>): T {
    return visitor.visitNightShift(this);
  }
}

class RemoteShiftEmployee extends Employee {
  generateReport(): void {
    console.log(`Generating report for remote employee: ${this.name}`);
  }

  calculateOverTime(): void {
    console.log(`Calculating overtime for remote employee: ${this.name}`);
  }

  accept<T>(visitor: IScheduleManagementVisitor<T>): T {
    return visitor.visitRemoteShift(this);
  }
}

const dayEmployee = new DayTimeShiftEmployee("John Doe", 30);
const nightEmployee = new NightShiftEmployee("Jane Smith", 28);
const remoteEmployee = new RemoteShiftEmployee("Bob Johnson", 35);

const leaveRequest: LeaveRequest = {
  startDate: new Date(2025, 3, 20),
  endDate: new Date(2025, 3, 30),
  reason: "Family vacation",
  status: "pending",
};

const leaveVisitor = new ManageLeaveRequestVisitor(leaveRequest);

const isDayLeaveApproved = dayEmployee.accept(leaveVisitor);
const isNightLeaveApproved = nightEmployee.accept(leaveVisitor);
const isRemoteLeaveApproved = remoteEmployee.accept(leaveVisitor);

console.log(`Day employee leave approved: ${isDayLeaveApproved}`);
console.log(`Night employee leave approved: ${isNightLeaveApproved}`);
console.log(`Remote employee leave approved: ${isRemoteLeaveApproved}`);
