
import { IsNotEmpty } from "class-validator";

export class MultipleImageUploadDto {
    @IsNotEmpty()
    employeeId: string;
    
}


