import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as argon2 from 'argon2';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    identifier: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @BeforeInsert() 
    async hashPassword() {
        this.password = await argon2.hash(this.password);
    }

    @Column({default: ""})
    profilePicture: string;
    
    @Column()
    firstName: string;

    @Column()
    lastName: string;
}