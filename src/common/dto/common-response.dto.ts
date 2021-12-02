import { IsNotEmpty } from 'class-validator';

export class CommonResponseDto {
    @IsNotEmpty()
    readonly status: "SUCCESS" | "FAILED";

    readonly data?: any;
}