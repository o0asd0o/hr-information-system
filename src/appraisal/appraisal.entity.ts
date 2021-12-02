import { Entity, Column, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { EmployeeEntity } from '../employee/employee.entity';


@Entity('appraisal')
export class AppraisalEntity extends BaseEntity {
    @Column({
        type: "timestamp",
        default: () => 'CURRENT_TIMESTAMP'
    })
    evaluationDate: Date;

    @Column()
    evaluatorName: string;

    @Column({ default: "" })
    notes: string;

    @Column()
    employeeId: number;
    
    @OneToMany(() => EmployeeEntity, employee => employee.appraisals)
    @JoinColumn({ name: "employeeId" })
    employee: EmployeeEntity;
}