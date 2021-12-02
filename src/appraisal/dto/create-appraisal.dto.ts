import { IsNotEmpty } from "class-validator";

export class CreateAppraisalDto {
    @IsNotEmpty()
    evaluationDate: Date;

    @IsNotEmpty()
    evaluatorName: string;

    @IsNotEmpty()
    notes: string;
    
    @IsNotEmpty()
    employeeId: number;
}