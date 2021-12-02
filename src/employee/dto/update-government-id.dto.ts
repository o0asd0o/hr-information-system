import { IsNotEmpty } from "class-validator";

export class UpdateGovementIdDto {
    @IsNotEmpty()
    employeeId: number;

    @IsNotEmpty()
    idNumber: string;

    @IsNotEmpty()
    name: string;

    image?: string;
}


