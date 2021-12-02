import { IsNotEmpty } from "class-validator";

export class UploadGovementIdDto {
    @IsNotEmpty()
    employeeId: number;

    @IsNotEmpty()
    idNumber: string;

    @IsNotEmpty()
    name: string;
}


