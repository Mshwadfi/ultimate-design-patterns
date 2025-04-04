"use strict";
//violation
// although part and full time are of the same type - Employee- if i call the calc salary
// at both they will return different values
Object.defineProperty(exports, "__esModule", { value: true });
class Employee {
    name;
    workHours;
    constructor(name, workHours) {
        this.name = name;
        this.workHours = workHours;
    }
}
class PartTimeEmployee extends Employee {
    calcSalary() {
        return this.workHours * 30;
    }
}
class FullTimeEmployee_1 extends Employee {
    calcSalary() {
        return this.workHours * 20;
    }
}
const ali = new PartTimeEmployee("ali", 10);
ali.calcSalary();
const ahmed = new PartTimeEmployee("ahmed", 40);
ahmed.calcSalary();
