import { IsNotEmpty } from "class-validator";
import { EmployeeEntity } from "../../employee/employee.entity";
import { DivisionType } from "../../employee/enums/employee.enum";

export class EmployeeFieldsDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    middleName: string;

    @IsNotEmpty()
    profilePicture: string;

    @IsNotEmpty()
    employeeIdNumber: string;

    @IsNotEmpty()
    position: string;

    @IsNotEmpty()
    division: DivisionType;
}