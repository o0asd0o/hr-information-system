import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CommonResponseDto } from '../common/dto/common-response.dto';
import { queryFindOneByIdentifier } from '../common/queries/find-one.query';
import { DivisionEntity } from './division.entity';
import { DivisionsRO, DivisionRO } from './division.interface';
import { CreateDivisionDto } from "./dto/create-division.dto";
import { UpdateDivisionDto } from './dto/update-division.dto';

@Injectable()
export class DivisionService {
    constructor(
        @InjectRepository(DivisionEntity) private readonly divisionRepository: Repository<DivisionEntity>,
    ) {}

    async findAll(query: any): Promise<DivisionsRO> {
        const queryBuilder = getRepository(DivisionEntity)
          .createQueryBuilder('division');

        queryBuilder.where("deleted = false");

        const divisionsCount = await queryBuilder.getCount();

        if ('divisionType' in query) {
            queryBuilder.andWhere("divisionType = :divisionType", { divisionType: query.divisionType });
        }

        if ('limit' in query) {
            queryBuilder.limit(query.limit);
        }
    
        if ('offset' in query) {
            queryBuilder.offset(query.offset);
        }
    
        const divisions = await queryBuilder.getMany();
    
        return { divisions, divisionsCount };
    }

    async findOne(divisionId: number): Promise<DivisionRO> {
        const division = await this.divisionRepository.findOne(queryFindOneByIdentifier(divisionId));
        if (division) {
            return { division };
        }
        throw new HttpException({ message: "Division not found." }, HttpStatus.NOT_FOUND);
    }

    async create(divisionData: CreateDivisionDto): Promise<CommonResponseDto> {
        const division = new DivisionEntity();
        division.description = divisionData.description;
        division.divisionName = divisionData.divisionName;
        division.location = divisionData.location;
        division.divisionType = divisionData.divisionType;

        const createdDivision = await this.divisionRepository
            .save(division)
            .catch((error) => {
                throw new HttpException({ message: "Error occurred while saving division", error }, HttpStatus.INTERNAL_SERVER_ERROR);
            });

        return { status: "SUCCESS", data: createdDivision };
    }

    async update(divisionId: number, divisionData: UpdateDivisionDto): Promise<CommonResponseDto> {
        let toUpdate = await this.divisionRepository.findOne(queryFindOneByIdentifier(divisionId));
        if (toUpdate) {
            let updated = Object.assign(toUpdate, divisionData);
            const division = await this.divisionRepository
                .save(updated)
                .catch((error: any) => {
                    throw new HttpException({ message: "Error occurred while updating division", error }, HttpStatus.INTERNAL_SERVER_ERROR);
                });

            return { status: "SUCCESS", data: division };
        }
        throw new HttpException({ message: "Error occurred while updating division", error: "division request doesn't exists" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    async delete(divisionId: number): Promise<CommonResponseDto> {
        let toDelete = await this.divisionRepository.findOne(queryFindOneByIdentifier(divisionId));
        if (toDelete) {
            let deletedDivision = Object.assign(toDelete, { deleted: true });
            await this.divisionRepository
                .save(deletedDivision)
                .catch((error: any) => {
                    throw new HttpException({ message: "Error occurred while deleting division", error }, HttpStatus.INTERNAL_SERVER_ERROR);
                });
            return { status: "SUCCESS" };
        }
        throw new HttpException({ message: "Error occurred while deleting division", error: "division doesn't exists" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
