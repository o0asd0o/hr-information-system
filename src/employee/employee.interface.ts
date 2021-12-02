import { EmployeeEntity } from "./employee.entity";

export interface EmployeeRO {
    employee: EmployeeEntity;
}
  
  export interface EmployeesRO {
    employees: EmployeeEntity[];
    employeesCount: number;
  }