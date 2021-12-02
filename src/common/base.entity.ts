import { Column, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
    constructor(identifier?: number) {
        this.identifier = identifier
    }
    @PrimaryGeneratedColumn()
    identifier: number;

    @Column({
        type: "timestamp",
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdDate: Date;

    @Column({
        type: "timestamp",
        default: () => 'CURRENT_TIMESTAMP'
    })
    updatedDate: Date;

    @Column({ default: false })
    deleted: boolean;

    @BeforeInsert()
    createTimestamp() {
        this.createdDate = new Date;
    } 

    @BeforeUpdate()
    @BeforeInsert()
    updateTimestamp() {
        this.updatedDate = new Date;
    }
}