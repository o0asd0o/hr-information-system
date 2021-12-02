import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, getRepository } from 'typeorm';
import { UserEntity } from "./user.entity";
import { UserRO } from './user.interface';
import { LoginUserDto } from './dto/login-user.dto';
import * as argon2 from "argon2";
import { SECRET } from '../config';
import { CreateUserDto } from './dto/create-user.dto';
import { validate } from 'class-validator';
import { UpdateUserDto } from './dto/update-user.dto';
import { CommonResponseDto } from '../common/dto/common-response.dto';
import { UserAbstract } from './abstract/user.abstract';
const jwt = require("jsonwebtoken");

@Injectable()
export class UserService extends UserAbstract {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
      super()
    }

    async findByCredentials({ username, password, token }: LoginUserDto) {
      
      if (token) {
        const { username } = this.getUserFromToken(token);
        const user = await this.userRepository.findOne({ username });
        return user;
      }

      const user = await this.userRepository.findOne({ username });
      if (!user) {
        return null;
      }

      if (await argon2.verify(user.password, password)) {
        return user;
      }

      return null;
    }

    async uploadProfile(identifier: number, fileName: string): Promise<CommonResponseDto> {
      const toUpdate = await this.userRepository.findOne(identifier);
      delete toUpdate.password;

      const updated = Object.assign({}, toUpdate, { profilePicture: fileName });
      const user = await this.userRepository
        .save(updated)
        .catch((error: any) => {
          const message = "There's something wrong while updating the profile picture.";
          throw new HttpException({ message, error }, HttpStatus.INTERNAL_SERVER_ERROR);
        });

      return { status: "SUCCESS" };
    }

    async update(id: number, dto: UpdateUserDto): Promise<UserEntity> {
      const toUpdate = await this.userRepository.findOne({ identifier: id });
      delete toUpdate.password;
  
      const updated = Object.assign(toUpdate, dto);
      return await this.userRepository.save(updated);
    }

    async create(dto: CreateUserDto): Promise<UserRO> {
        // check uniqueness of username
        const { username, password, firstName, lastName } = dto;
        const queryBuilder = await getRepository(UserEntity)
          .createQueryBuilder('user')
          .where('user.username = :username', { username });
    
        const user = await queryBuilder.getOne();
    
        if (user) {
          const errors = { username: 'Username and email must be unique.' };
          throw new HttpException({ message: 'Input data validation failed', errors }, HttpStatus.BAD_REQUEST);
        }
    
        // create new user
        let newUser = new UserEntity();
        newUser.username = username;
        newUser.password = password;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
    
        const errors = await validate(newUser);
        if (errors.length > 0) {
          const _errors = {username: 'Userinput is not valid.'};
          throw new HttpException({message: 'Input data validation failed', _errors}, HttpStatus.BAD_REQUEST);
    
        } else {
          const savedUser = await this.userRepository.save(newUser);
          return this.buildUserRO(savedUser);
        }
    }

    async findById(id: number): Promise<UserRO>{
        const user = await this.userRepository.findOne(id);
    
        if (!user) {
          const errors = {User: ' not found'};
          throw new HttpException({errors}, 401);
        }
    
        return this.buildUserRO(user);
    }
}
