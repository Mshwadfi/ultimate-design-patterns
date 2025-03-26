
//violation 
// although part and full time are of the same type - Employee- if i call the calc salary
// at both they will return different values

class Employee{
    protected name : string;
    protected workHours: number;
    constructor(name, workHours){
        this.name = name;
        this.workHours = workHours;
    }

    calculateSalary(){
        return this.workHours * 10;
    }
}

class PartTimeEmployee extends Employee{

    calculateSalary(){
        return this.workHours * 20;
    }
}

class FullTimeEmployee extends Employee{

    calculateSalary(){
        return this.workHours * 15;
    }
}


// apply LSP
// since each employee has its own method to calc salary, them put this
// method to interface and each one could implement it in its own.

interface CalcSalary{
    calcSalary(): number;
}

class Employee_1{
    protected name : string;
    protected workHours: number;
    constructor(name, workHours){
        this.name = name;
        this.workHours = workHours;
    }

}

class PartTimeEmployee_1 extends Employee implements CalcSalary{

    calcSalary(){
        return this.workHours * 30;
    }
}


class FullTimeEmployee_1 extends Employee implements CalcSalary{

    calcSalary(){
        return this.workHours * 20;
    }
}

const ali = new PartTimeEmployee_1('ali', 10);
ali.calcSalary();

const ahmed = new PartTimeEmployee_1('ahmed', 40);
ahmed.calcSalary();
