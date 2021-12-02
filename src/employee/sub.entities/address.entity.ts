import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { EmployeeEntity } from '../employee.entity';
import { AddressType } from '../enums/employee.enum';


@Entity('address')
export class AddressEntity extends BaseEntity {
    @Column()
    streetAddress: string;

    @Column()
    addressLine2: string;

    @Column()
    cityMunicipality: string;

    @Column()
    postalCode: string;

    @Column()
    province: string;

    @Column()
    country: string;

    @Column({
        type: "enum",
        enum: AddressType,
    })
    addressType: AddressType;

    @Column()
    employeeId: number;
    
    @ManyToOne(() => EmployeeEntity, employee => employee.address)
    @JoinColumn({ name: "employeeId" })
    employee: EmployeeEntity;
}