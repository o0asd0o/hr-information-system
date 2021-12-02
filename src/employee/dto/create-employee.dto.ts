import { IsNotEmpty } from "class-validator";
import { CivilStatus, DivisionType, EmployementStatus, Gender } from "../enums/employee.enum";
import { AddressDto } from "./address.dto";

export class CreateEmployeeDto {
    @IsNotEmpty()
    employeeIdNumber: string;
    
    @IsNotEmpty()
    position: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    middleName: string;

    @IsNotEmpty()
    civilStatus: CivilStatus;

    @IsNotEmpty()
    emailAddress: string;

    @IsNotEmpty()
    contactNumber: string;

    @IsNotEmpty()
    emergencyContactPerson: string;

    @IsNotEmpty()
    emergencyContactNumber: string;

    @IsNotEmpty()
    birthDate: Date;

    @IsNotEmpty()
    placeOfBirth: string;

    @IsNotEmpty()
    gender: Gender;

    @IsNotEmpty()
    age: number;

    @IsNotEmpty()
    salary: string;

    @IsNotEmpty()
    reportsTo: string;
    
    @IsNotEmpty()
    divisionType: DivisionType;

    @IsNotEmpty()
    employmentStatus: EmployementStatus;
    
    @IsNotEmpty()
    startDate: Date;

    @IsNotEmpty()
    address: AddressDto[];

    @IsNotEmpty()
    divisionId: number;
}