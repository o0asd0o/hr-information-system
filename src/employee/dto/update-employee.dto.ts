import { IsNotEmpty } from "class-validator";
import { CivilStatus, DivisionType, EmployementStatus, Gender } from "../enums/employee.enum";
import { AddressDto } from "./address.dto";

export class UpdateEmployeeDto {
    employeeId: string;
    position: string;
    firstName: string;
    lastName: string;
    middleName: string;
    civilStatus: CivilStatus;
    emailAddress: string;
    contactNumber: string;
    emergencyContactPerson: string;
    emergencyContactNumber: string;
    birthDate: Date;
    placeOfBirth: string;
    gender: Gender;
    age: number;
    salary: number;
    reportsTo: string;
    divisionType: DivisionType;
    employmentStatus: EmployementStatus;
    startDate: Date;
    address: AddressDto[];
    divisionId: number;
}