import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CommonResponseDto } from '../common/dto/common-response.dto';
import { queryFindOneByIdentifier } from '../common/queries/find-one.query';
import { EmployeeEntity } from '../employee/employee.entity';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { LeaveCountByType } from "./dto/leave-count-by-type.dto";
import { LeaveStatus, LeaveType } from './enums/leave.enum';
import { LeaveEntity } from './leave.entity';
import { LeaveRO, LeavesRO, LeaveSummary } from './leave.interface';
import { getDateDifference } from "../common/utils/date.util";
import { DivisionType } from '../employee/enums/employee.enum';

@Injectable()
export class LeaveService {
    constructor(
        @InjectRepository(LeaveEntity) private readonly leaveRepository: Repository<LeaveEntity>,
        @InjectRepository(EmployeeEntity) private readonly employeeRepository: Repository<EmployeeEntity>,
    ) {}

    async findByEmployeeId(query: any): Promise<LeavesRO> {
        const queryBuilder = getRepository(LeaveEntity)
          .createQueryBuilder('leave');

        queryBuilder.where("leave.deleted = false");

        if (!query.employeeId) {
            throw new HttpException({ message: "employeeId is missing in the parameter." }, HttpStatus.NOT_FOUND);
        }

        queryBuilder.andWhere("leave.employeeId = :employeeId", { employeeId: query.employeeId });

        if ('leaveType' in query) {
            queryBuilder.andWhere("leave.leaveType = :leaveType", { leaveType: query.leaveType });
        }
    
        if ('status' in query) {
            queryBuilder.andWhere("leave.status = :status", { status: query.status });
        }

        const leavesCount = await queryBuilder.getCount();

        if ('limit' in query) {
            queryBuilder.limit(query.limit);
        }
    
        if ('offset' in query) {
            queryBuilder.offset(query.offset);
        }

        const leaves = await queryBuilder.getMany();
        
        return { leaves, leavesCount };
    }

    async findOne(leaveId: number): Promise<CommonResponseDto> {
        const leave = await this.leaveRepository.findOne(queryFindOneByIdentifier(leaveId));
        if (leave) {
            return { status: "SUCCESS", data: { leave } };
        }
        throw new HttpException({ message: "Leave request not found." }, HttpStatus.NOT_FOUND);
    }

    async create(leaveData: CreateLeaveDto): Promise<CommonResponseDto> {
        const leave = new LeaveEntity();
        leave.employeeId = leaveData.employeeId;
        leave.requestDate = leaveData.requestDate;
        leave.leaveStartDate = leaveData.leaveStartDate;
        leave.leaveEndDate = leaveData.leaveEndDate;
        leave.reasonForLeave = leaveData.reasonForLeave;
        leave.status = leaveData.status;
        leave.totalDaysPaid = leaveData.totalDaysPaid;
        leave.leaveType = leaveData.leaveType;

        const createdLeave = await this.leaveRepository
            .save(leave)
            .catch((error) => {
                throw new HttpException({ message: "Error occurred while saving leave request", error }, HttpStatus.INTERNAL_SERVER_ERROR);
            });

        return { status: "SUCCESS", data: { leaveId: createdLeave.identifier } };
    }

    async update(leaveId: number, leaveData: UpdateLeaveDto): Promise<CommonResponseDto> {
        let toUpdate = await this.leaveRepository.findOne(queryFindOneByIdentifier(leaveId));
        if (toUpdate) {
            let updated = Object.assign(toUpdate, leaveData);
            const leave = await this.leaveRepository
                .save(updated)
                .catch((error: any) => {
                    throw new HttpException({ message: "Error occurred while updating leave request", error }, HttpStatus.INTERNAL_SERVER_ERROR);
                });

            return { status: "SUCCESS", data: { leaveId: leave.identifier } };
        }
        throw new HttpException({ message: "Error occurred while updating leave request", error: "leave request doesn't exists" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    async delete(leaveId: number): Promise<CommonResponseDto> {
        let toDelete = await this.leaveRepository.findOne(queryFindOneByIdentifier(leaveId));
        if (toDelete) {
            let deletedLeave = Object.assign(toDelete, { deleted: true });
            await this.leaveRepository
                .save(deletedLeave)
                .catch((error: any) => {
                    throw new HttpException({ message: "Error occurred while deleting document", error }, HttpStatus.INTERNAL_SERVER_ERROR);
                });
            return { status: "SUCCESS", data: { leaveId } };
        }
        throw new HttpException({ message: "Error occurred while deleting leave request", error: "leave request doesn't exists" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    async findEmployeeLeaveSummary(employeeId: number): Promise<CommonResponseDto> {
        const getLeavesByStatus = async (status: string) => {
            return await getRepository(LeaveEntity)
            .createQueryBuilder("leave")
            .where("leave.employeeId = :employeeId", { employeeId })
            .andWhere("leave.status = :status", { status })
            .andWhere("deleted = false")
            .select("SUM(leave.totalDaysPaid)", "leaveDaysCount")
            .addSelect("leaveType", "leaveType")
            .groupBy("leave.leaveType")
            .getRawMany() as Array<LeaveCountByType>; 
        };

        const pendingLeaves = await getLeavesByStatus(LeaveStatus.PENDING);
        const approvedLeaves = await getLeavesByStatus(LeaveStatus.APPROVED);

        const employee = await this.employeeRepository.findOne(queryFindOneByIdentifier(employeeId));

        const { startDate, divisionType } = employee;

        const reduceLeaveObject = (accu: any, current: LeaveCountByType) => {
            const { leaveType, leaveDaysCount } = current;
            return { ...accu, [leaveType]: leaveDaysCount };
        };

        if (divisionType === DivisionType.PMO) {
            const allowableLeavesPerYear = 7;
            const restrictedLeavesPerYear = 12 - allowableLeavesPerYear;

            const monthsOfTenureship = getDateDifference(startDate, new Date()).months();
            const totalAllowableLeaves = monthsOfTenureship * Math.round((allowableLeavesPerYear / 12) * 100) / 100;
            const totalRestrictedLeaves = monthsOfTenureship *  Math.round((restrictedLeavesPerYear / 12) * 100) / 100;


            const approvedLeavesObject = approvedLeaves.reduce(reduceLeaveObject, {});

            const totalSickLeavesConsumed = approvedLeavesObject[LeaveType.SICK_LEAVE] ?? 0;
            const totalVacationLeavesConsumed = approvedLeavesObject[LeaveType.VACATION_LEAVE] ?? 0;
            
            const remainingVacationLeaves = totalAllowableLeaves - totalVacationLeavesConsumed;
            const remainingSickLeaves = totalAllowableLeaves - totalSickLeavesConsumed;
            
            return {
                status: "SUCCESS",
                data: {
                    summary: {
                        remainingVacationLeaves,
                        remainingSickLeaves,
                        remainingServiceIncentiveLeaves: 0,
                        totalRestrictedLeaves,
                        pendingLeaves: pendingLeaves.reduce(reduceLeaveObject, {})
                    }
                }
            }
        } else {
            const allowableLeavesPerYear = 5;

            const yearsOfTenureship = getDateDifference(startDate, new Date()).years();
            const totalLeaves = yearsOfTenureship * allowableLeavesPerYear;

            const approvedLeavesObject = approvedLeaves.reduce(reduceLeaveObject, {});

            const totalServiceIncenticeLeavesConsumed = approvedLeavesObject[LeaveType.SERVICE_INCENTIVE_LEAVE] ?? 0;
            const remainingServiceIncentiveLeaves = totalLeaves - totalServiceIncenticeLeavesConsumed;

            return {
                status: "SUCCESS",
                data: {
                    summary: {
                        remainingVacationLeaves: 0,
                        remainingSickLeaves: 0,
                        remainingServiceIncentiveLeaves,
                        totalRestrictedLeaves: 0,
                        pendingLeaves: pendingLeaves.reduce(reduceLeaveObject, {})
                    }
                }
            }
        }
    }
}
