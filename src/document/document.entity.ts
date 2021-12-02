import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { EmployeeEntity } from '../employee/employee.entity';


@Entity('document')
export class DocumentEntity extends BaseEntity {
    @Column({ default: "" })
    image: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    employeeId: number;
    
    @ManyToOne(() => EmployeeEntity, employee => employee.documents)
    @JoinColumn({ name: "employeeId" })
    employee: EmployeeEntity;
}