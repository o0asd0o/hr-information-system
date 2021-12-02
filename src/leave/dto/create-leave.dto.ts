import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { LeaveStatus, LeaveType } from "../enums/leave.enum";

export class CreateLeaveDto {
    @IsNotEmpty()
    @ApiProperty({ enum: LeaveType })
    leaveType: LeaveType;

    @IsNotEmpty()
    @ApiProperty({ example: '2020-11-21', type: "date" })
    requestDate: Date;

    @IsNotEmpty()
    @ApiProperty({ example: '2020-11-21', type: "date" })
    leaveStartDate: Date;

    @IsNotEmpty()
    @ApiProperty({ example: '2020-11-22', type: "date" })
    leaveEndDate: Date;

    @IsNotEmpty()
    @ApiProperty()
    totalDaysPaid: number;

    @ApiProperty()
    reasonForLeave: string;

    @IsNotEmpty()
    @ApiProperty({ enum: LeaveStatus })
    status: LeaveStatus;

    @IsNotEmpty()
    @ApiProperty()
    employeeId: number;
}