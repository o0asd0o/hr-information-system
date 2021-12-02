import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { AppraisalEntity } from '../appraisal/appraisal.entity';
import { BaseEntity } from '../common/base.entity';
import { DivisionEntity } from '../division/division.entity';
import { DocumentEntity } from '../document/document.entity';
import { LeaveEntity } from "../leave/leave.entity"; 
import { CivilStatus, DivisionType, EmployementStatus, Gender } from './enums/employee.enum';
import { AddressEntity } from './sub.entities/address.entity';
import { GovernmentIdEntity } from './sub.entities/government.entity';


@Entity('employee')
@Unique(["employeeIdNumber"])
export class EmployeeEntity extends BaseEntity {
    @Column()
    employeeIdNumber: string;
    
    @Column()
    position: string;
    
    @Column({ default: "" })
    profilePicture: string;
    
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    middleName: string;

    @Column({
        type: "enum",
        enum: CivilStatus,
        default: CivilStatus.SINGLE
    })
    civilStatus: CivilStatus

    @Column()
    emailAddress: string;

    @Column()
    contactNumber: string;

    @Column()
    emergencyContactPerson: string;

    @Column()
    emergencyContactNumber: string;

    @Column({ type: "date" })
    birthDate: Date;

    @Column()
    placeOfBirth: string;

    @Column({
        type: "enum",
        enum: Gender,
    })
    gender: Gender;

    @Column()
    age: number;

    @Column()
    salary: string;

    @Column()
    reportsTo: string;

    @Column({
        type: "enum",
        enum: DivisionType,
    })
    divisionType: DivisionType;

    @Column({
        type: "enum",
        enum: EmployementStatus,
        default: EmployementStatus.PROBATIONARY
    })
    employmentStatus: EmployementStatus;

    @Column({ type: "date" })
    startDate: Date;

    @Column({ type: "date", default: null })
    departureDate: Date;

    @ManyToOne(() => DivisionEntity, division => division.employees, { eager: true })
    @JoinColumn({ name: "divisionId" })
    division: DivisionEntity;

    @OneToMany(() => GovernmentIdEntity, governmentId => governmentId.employee, { eager: true })
    governmentIds: GovernmentIdEntity[];

    @OneToMany(() => AddressEntity, address => address.employee, { eager: true })
    address: AddressEntity[];

    @OneToMany(() => DocumentEntity, document => document.employee)
    documents: DocumentEntity[];

    @OneToMany(() => AppraisalEntity, appraisal => appraisal.employee)
    appraisals: AppraisalEntity[];

    @OneToMany(() => LeaveEntity, leave => leave.employee)
    leaves: LeaveEntity[];
}