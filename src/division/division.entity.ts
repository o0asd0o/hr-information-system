import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { EmployeeEntity } from '../employee/employee.entity';
import { DivisionType } from '../employee/enums/employee.enum';


@Entity('division')
export class DivisionEntity extends BaseEntity {
    constructor(divisionId?: number) {
        super(divisionId);
    }
    @Column({
        type: "enum",
        enum: DivisionType,
    })
    divisionType: DivisionType;

    @Column()
    location: string;

    @Column()
    divisionName: string;

    @Column()
    description: string;

    @OneToMany(() => EmployeeEntity, employee => employee.division)
    employees: EmployeeEntity[];
}