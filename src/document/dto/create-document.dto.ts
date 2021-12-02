import { IsNotEmpty } from "class-validator";

export class CreateDocumentDto {
    @IsNotEmpty()
    image: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    employeeId: number;
}