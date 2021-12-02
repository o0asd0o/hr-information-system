import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { EmployeeEntity } from '../employee/employee.entity';
import { LeaveType, LeaveStatus } from './enums/leave.enum';


@Entity('leave')
export class LeaveEntity extends BaseEntity {
    @Column({
        type: "enum",
        enum: LeaveType
    })
    leaveType: LeaveType;

    @Column({ type: "date" })
    requestDate: Date;

    @Column({ type: "date" })
    leaveStartDate: Date;

    @Column({ type: "date" })
    leaveEndDate: Date;

    @Column()
    totalDaysPaid: number;

    @Column()
    reasonForLeave: string;

    @Column({
        type: "enum",
        enum: LeaveStatus,
    })
    status: LeaveStatus;

    @Column()
    employeeId: number;

    @ManyToOne(() => EmployeeEntity, employee => employee.leaves, { eager: true })
    @JoinColumn({ name: "employeeId" })
    employee: EmployeeEntity;
}