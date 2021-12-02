import { LeaveStatus, LeaveType } from "../enums/leave.enum";

export class UpdateLeaveDto {
    leaveType?: LeaveType;
    requestDate?: Date;
    leaveStartDate?: Date;
    leaveEndDate?: Date;
    totalDaysPaid?: number;
    reasonForLeave?: string;
    status?: LeaveStatus;
}
