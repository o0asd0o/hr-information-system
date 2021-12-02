import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { EmployeeEntity } from '../employee.entity';


@Entity('government_id')
export class GovernmentIdEntity extends BaseEntity {
    @Column()
    idNumber: string;

    @Column({ default: "" })
    image: string;

    @Column()
    name: string;

    @Column()
    employeeId: number;
    
    @ManyToOne(() => EmployeeEntity, employee => employee.documents)
    @JoinColumn({ name: "employeeId" })
    employee: EmployeeEntity;
}