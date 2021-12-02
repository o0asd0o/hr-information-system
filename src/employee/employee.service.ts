import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, getRepository } from 'typeorm';
import { CommonResponseDto } from '../common/dto/common-response.dto';
import { queryFindOneByIdentifier } from '../common/queries/find-one.query';
import { DivisionEntity } from '../division/division.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { UpdateGovementIdDto } from './dto/update-government-id.dto';
import { UploadGovementIdDto } from './dto/upload-government-id.dto';
import { EmployeeEntity } from './employee.entity';
import { EmployeeRO, EmployeesRO } from './employee.interface';
import { AddressEntity } from './sub.entities/address.entity';
import { GovernmentIdEntity } from './sub.entities/government.entity';
import { EMPLOYEE_FILE_FOLDER, EMPLOYEE_IMAGE_FOLDER } from '../config';
import { getAddressToUpdate } from '../common/utils';

const fs = require('fs');

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(EmployeeEntity) private readonly employeeRepository: Repository<EmployeeEntity>,
        @InjectRepository(GovernmentIdEntity) private readonly governmentIdRepository: Repository<GovernmentIdEntity>,
        @InjectRepository(AddressEntity) private readonly addressRepository: Repository<AddressEntity>
    ) {}

    async findAll(query): Promise<EmployeesRO> {

        const queryBuilder = getRepository(EmployeeEntity)
          .createQueryBuilder('employee');

        queryBuilder.where("employee.deleted = false");

        if ('employmentStatus' in query) {
            queryBuilder.andWhere("employee.employmentStatus = :employmentStatus", { employmentStatus: query.employmentStatus });
        }
    
        if ('divisionType' in query) {
            queryBuilder.andWhere("employee.divisionType = :divisionType", { divisionType: query.divisionType });
        }

        if ('employeeIdNumber' in query && query.employeeIdNumber) {
            queryBuilder.andWhere("employee.employeeIdNumber LIKE :employeeIdNumber", { employeeIdNumber: `%${query.employeeIdNumber}%` });
        }

        if ('position' in query && query.position) {
            queryBuilder.andWhere("employee.position LIKE :position", { position: `${query.position}%` });
        }

        if ('fullName' in query && query.fullName) {
            const [firstName, lastName] = query.fullName.split(" ");
            queryBuilder.andWhere("employee.firstName LIKE :firstName OR employee.lastName LIKE :lastName", {
                firstName: `${firstName}%`,
                lastName: `${lastName}%`
            });
        }

        if ('fullNameEmployeeNumber' in query && query.fullNameEmployeeNumber) {
            const [firstName, lastName] = query.fullNameEmployeeNumber.split(" ");
            queryBuilder.andWhere("employee.firstName LIKE :firstName OR employee.lastName LIKE :lastName OR employeeIdNumber LIKE :employeeIdNumber", {
                firstName: `${firstName}%`,
                lastName: `${lastName}%`,
                employeeIdNumber: query.fullNameEmployeeNumber
            });
        }
        
        queryBuilder.leftJoinAndSelect("employee.address", "address");

        queryBuilder.orderBy('employee.createdDate', 'DESC');
    
        const employeesCount = await queryBuilder.getCount();
    
        if ('limit' in query) {
            queryBuilder.limit(query.limit);
        }
    
        if ('offset' in query) {
            queryBuilder.offset(query.offset);
        }
    
        const employees = await queryBuilder.getMany();
    
        return { employees, employeesCount };
    }

    async findOne(employeeIdNumber: string): Promise<CommonResponseDto> {
        const employee = await this.employeeRepository.findOne({
            where: {
                employeeIdNumber,
                deleted: false,
            }
        });

        if (employee) {
            return {  status: "SUCCESS", data: { employee } };
        }

        throw new HttpException({ message: "Error occurred while getting employee", error: "employee doesn't exists" }, HttpStatus.NOT_FOUND);
    }

    async create(employeeData: CreateEmployeeDto): Promise<CommonResponseDto> {
        const employee = new EmployeeEntity();
        employee.employeeIdNumber = employeeData.employeeIdNumber;
        employee.position = employeeData.position;
        employee.firstName = employeeData.firstName;
        employee.lastName = employeeData.lastName;
        employee.middleName = employeeData.middleName;
        employee.civilStatus = employeeData.civilStatus;
        employee.emailAddress = employeeData.emailAddress
        employee.contactNumber = employeeData.contactNumber
        employee.emergencyContactPerson = employeeData.emergencyContactPerson
        employee.emergencyContactNumber = employeeData.emergencyContactNumber
        employee.birthDate = employeeData.birthDate
        employee.placeOfBirth = employeeData.placeOfBirth
        employee.gender = employeeData.gender
        employee.age = employeeData.age
        employee.salary = employeeData.salary
        employee.reportsTo = employeeData.reportsTo
        employee.divisionType = employeeData.divisionType
        employee.employmentStatus = employeeData.employmentStatus
        employee.startDate = employeeData.startDate

        employee.division = new DivisionEntity(employeeData.divisionId)
        employee.governmentIds = [];
        employee.documents = [];
        employee.appraisals = [];
        employee.leaves = [];

        const addresses = employeeData.address.map((add) => {
            const newAddress = new AddressEntity();
            newAddress.addressLine2 = add.addressLine2;
            newAddress.postalCode = add.postalCode;
            newAddress.province = add.province;
            newAddress.streetAddress = add.streetAddress;
            newAddress.cityMunicipality = add.cityMunicipality;
            newAddress.country = add.country;
            newAddress.addressType = add.addressType;
            return newAddress;
        });

        const createdEmployee = await this.employeeRepository
            .save(employee)
            .catch((error) => {
                throw new HttpException({ message: "Error occurred while saving employee", error }, HttpStatus.INTERNAL_SERVER_ERROR);
            });

        const mapIdentifierToAddress = (address) => ({ ...address, employeeId: createdEmployee.identifier });
        addresses.map(mapIdentifierToAddress).forEach(async (address) => await this.addressRepository
            .save(address)
            .catch((error) => {
                throw new HttpException({ message: "Error occurred while saving address", error }, HttpStatus.INTERNAL_SERVER_ERROR);
            })
        );
        return { status: "SUCCESS", data: { employeeId: createdEmployee.identifier } };
    }

    async uploadProfile(employeeId: number, fileName: string): Promise<CommonResponseDto> {
        const toUpdate = await this.employeeRepository.findOne(queryFindOneByIdentifier(employeeId));

        if (toUpdate) {
            const updated = Object.assign({}, toUpdate, { profilePicture: fileName });
            const employee = await this.employeeRepository
                .save(updated)
                .catch((error: any) => {
                    const message = "There's something wrong while updating the profile picture.";
                    throw new HttpException({ message, error }, HttpStatus.BAD_REQUEST);
                });
            return { status: "SUCCESS", data: { employeeId: employee.identifier } };
        }

        throw new HttpException({ message: "Error occurred while saving profile picture", error: "employee doesn't exists" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    async uploadGovernmentId(governmentIdData: UploadGovementIdDto, fileName: string): Promise<CommonResponseDto> {
        const governmentId = new GovernmentIdEntity();
        governmentId.idNumber = governmentIdData.idNumber;
        governmentId.image = fileName;
        governmentId.name  = governmentIdData.name;
        governmentId.employeeId = governmentIdData.employeeId;

        const govId = await this.governmentIdRepository
            .save(governmentId)
            .catch((error: any) => {
                throw new HttpException({ message: "Error occurred while saving governmentId", error }, HttpStatus.INTERNAL_SERVER_ERROR);
            });
        
        return { status: "SUCCESS", data: govId };
    }

    async updateProfile(employeeId: number, fileName: string): Promise<CommonResponseDto> {
        const toUpdate = await this.employeeRepository.findOne(queryFindOneByIdentifier(employeeId));

        if (toUpdate) {
            const oldProfile = toUpdate.profilePicture;
            const fileNameWithPath = EMPLOYEE_IMAGE_FOLDER + "/" + oldProfile;
            if (fs.existsSync(fileNameWithPath)) {
                try {
                    fs.unlinkSync(fileNameWithPath);
                } catch(error) { console.log({ error }) }   
            }

            const updated = Object.assign({}, toUpdate, { profilePicture: fileName });
            const employee = await this.employeeRepository
                .save(updated)
                .catch((error: any) => {
                    const message = "There's something wrong while updating the profile picture.";
                    throw new HttpException({ message, error }, HttpStatus.BAD_REQUEST);
                });
            return { status: "SUCCESS", data: { employeeId: employee.identifier } };
        }

        throw new HttpException({ message: "Error occurred while saving profile picture", error: "employee doesn't exists" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    async updateGovernmentId(governmentIdData: UpdateGovementIdDto, fileName: string): Promise<CommonResponseDto> {
        let toUpdate = await this.governmentIdRepository.findOne({
            where: {
                employeeId: governmentIdData.employeeId,
                name: governmentIdData.name,
                deleted: false,
            }
        });
        
        if (toUpdate) {
            if (fileName) {
                governmentIdData.image = fileName;
                const oldGovernmentId = toUpdate.image;
                const fileNameWithPath = EMPLOYEE_FILE_FOLDER + "/" + oldGovernmentId;
                if (fs.existsSync(fileNameWithPath)) {
                    try {
                        fs.unlinkSync(fileNameWithPath);
                    } catch(error) { console.log({ error }) }   
                }
            }

            let updated = Object.assign(toUpdate, governmentIdData);
            const govId = await this.governmentIdRepository
                .save(updated)
                .catch((error: any) => {
                    throw new HttpException({ message: "Error occurred while updating government id", error }, HttpStatus.INTERNAL_SERVER_ERROR);
                })
            return { status: "SUCCESS", data: govId };
        } else if (fileName && governmentIdData.idNumber && governmentIdData.name && governmentIdData.employeeId) {
            const governmentId = new GovernmentIdEntity();
            governmentId.idNumber = governmentIdData.idNumber;
            governmentId.image = fileName;
            governmentId.name  = governmentIdData.name;
            governmentId.employeeId = governmentIdData.employeeId;
            const govId = await this.governmentIdRepository
                .save(governmentId)
                .catch((error: any) => {
                    throw new HttpException({ message: "Error occurred while saving governmentId", error }, HttpStatus.INTERNAL_SERVER_ERROR);
                });
            
            return { status: "SUCCESS", data: govId };
        }

        

        throw new HttpException({ message: "Error occurred while updating government id", error: "government id doesn't exists" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    async update(employeeId: number, employeeData: UpdateEmployeeDto): Promise<CommonResponseDto> {
        let toUpdate = await this.employeeRepository.findOne(queryFindOneByIdentifier(employeeId));
        if (toUpdate) {
            const updatedAddress = getAddressToUpdate(toUpdate, employeeData.address);
            const updated = Object.assign(toUpdate, employeeData);
            updated.address = Object.assign(updated.address, updatedAddress);
            const employee = await this.employeeRepository
                .save(updated)
                .catch((error: any) => {
                    throw new HttpException({ message: "Error occurred while updating employee", error }, HttpStatus.INTERNAL_SERVER_ERROR);
                });

            updated.address.forEach(async (address) => await this.addressRepository
                .save(address)
                .catch((error) => {
                    throw new HttpException({ message: "Error occurred while saving address", error }, HttpStatus.INTERNAL_SERVER_ERROR);
                })
            );

            return { status: "SUCCESS", data: { employeeId } };
        }
        throw new HttpException({ message: "Error occurred while updating employee", error: "employee doesn't exists" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    async delete(employeeIdNumber: number): Promise<CommonResponseDto> {
        let toDelete = await this.employeeRepository.findOne({
            where: {
                employeeIdNumber,
                deleted: false,
            }
        });
        if (toDelete) {
            let deletedEmployee = Object.assign(toDelete, { deleted: true });
            await this.employeeRepository
                .save(deletedEmployee)
                .catch((error: any) => {
                    throw new HttpException({ message: "Error occurred while deleting employee", error }, HttpStatus.INTERNAL_SERVER_ERROR);
                });
            return { status: "SUCCESS", data: { employeeId: deletedEmployee.identifier } };
        }
        throw new HttpException({ message: "Error occurred while deleting employee", error: "employee doesn't exists" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}