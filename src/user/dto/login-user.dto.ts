import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {

  readonly username: string;

  readonly password: string;

  readonly token: string;
  
}