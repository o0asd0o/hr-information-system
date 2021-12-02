import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { LeaveType } from "../enums/leave.enum";

export class LeaveCountByType {
    @IsNotEmpty()
    leaveDaysCount: number;

    @IsNotEmpty()
    leaveType: LeaveType;
}