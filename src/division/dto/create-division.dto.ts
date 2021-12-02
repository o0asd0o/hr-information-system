import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { DivisionType } from "../../employee/enums/employee.enum";

export class CreateDivisionDto {
    @IsNotEmpty()
    divisionType: DivisionType;

    @IsNotEmpty()
    location: string;

    @IsNotEmpty()
    divisionName: string;

    @IsNotEmpty()
    description: string;
}