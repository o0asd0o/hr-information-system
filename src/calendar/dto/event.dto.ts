import { IsNotEmpty } from "class-validator";
import { EmployeeEntity } from "../../employee/employee.entity";
import { EmployeeFieldsDto } from "./employee-fields.dto";

export enum EventType {
    BIRTHDAY = "birthday",
    ANNIVERSARY = "anniversary",
    EVALUATION = "evaluation",
    LEAVE = "leave"
}

export class EventDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    start: Date;

    @IsNotEmpty()
    end: Date;

    allDay?: boolean;
    resource?: any;

    redirectTo?: string;
    employee?: EmployeeFieldsDto;
    type: EventType
}