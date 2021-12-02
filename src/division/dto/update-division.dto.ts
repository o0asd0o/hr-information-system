import { DivisionType } from "../../employee/enums/employee.enum";

export class UpdateDivisionDto {
    divisionType?: DivisionType;
    location?: string;
    divisionName?: string;
    description?: string;
}