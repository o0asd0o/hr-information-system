import { LeaveStatus } from "./enums/leave.enum";
import { LeaveEntity } from "./leave.entity";

export interface LeaveRO {
    leave: LeaveEntity;
}
  
export interface LeavesRO {
    leaves: LeaveEntity[];
    leavesCount: number;
}

export type StatusKey = {
    [key in keyof typeof LeaveStatus]: number;
}

export interface LeaveSummary {
    summary: {
        remainingSickLeaves: number,
        remainingVacationLeaves: number,
        remainingServiceIncentiveLeaves: number
        totalRestrictedLeaves: number
        pendingLeaves: StatusKey
    }
}