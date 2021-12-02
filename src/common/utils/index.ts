import { AddressDto } from "../../employee/dto/address.dto";
import { EmployeeEntity } from "../../employee/employee.entity";

export const getAddressToUpdate = (toUpdate: EmployeeEntity, requestAddress: Array<AddressDto>) => {
    const address = requestAddress.slice();
    const currentAddress = toUpdate.address;

    return currentAddress.map((currentAddressItem) => {
        const updated = address.find((item) => item.addressType === currentAddressItem.addressType)
        return {
            ...currentAddressItem,
            ...updated
        }
    })
};
