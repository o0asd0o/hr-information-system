import { Request } from "express";

export interface UserData {
    username: string;
    token: string;
    profilePicture: string;
    firstName: string;
    lastName: string;
  }
  
  export interface UserRO {
    user: UserData;
    status: "SUCCESS" | "FAILED"
  }

  export interface UserRequest extends Request {
    user: UserData;
  }