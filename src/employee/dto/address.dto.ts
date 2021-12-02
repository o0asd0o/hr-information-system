import { AddressType } from "../enums/employee.enum";

export class AddressDto {
    streetAddress: string;
    addressLine2?: string;
    cityMunicipality: string;
    postalCode: string;
    province: string;
    country: string;
    addressType: AddressType;
}





