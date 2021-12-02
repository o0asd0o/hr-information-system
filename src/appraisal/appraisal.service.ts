import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CommonResponseDto } from '../common/dto/common-response.dto';
import { queryFindOneByIdentifier } from '../common/queries/find-one.query';
import { AppraisalEntity } from './appraisal.entity';
import { AppraisalRO, AppraisalsRO } from './appraisal.interface';
import { CreateAppraisalDto } from './dto/create-appraisal.dto';
import { UpdateAppraisalDto } from './dto/update-appraisal.dto';

@Injectable()
export class AppraisalService {
    constructor(
        @InjectRepository(AppraisalEntity) private readonly appraisalRepository: Repository<AppraisalEntity>,
    ) {}

    async findByEmployeeId(query: any): Promise<AppraisalsRO> {
        const queryBuilder = getRepository(AppraisalEntity)
          .createQueryBuilder('appraisal');

        queryBuilder.where("deleted = false");

        if (!query.employeeId) {
            throw new HttpException({ message: "employeeId is missing in the parameter." }, HttpStatus.NOT_FOUND);
        }

        queryBuilder.andWhere("appraisal.employeeId = :employeeId", { employeeId: query.employeeId });

        const appraisalsCount = await queryBuilder.getCount();

        if ('limit' in query) {
            queryBuilder.limit(query.limit);
        }
    
        if ('offset' in query) {
            queryBuilder.offset(query.offset);
        }
    
        const appraisals = await queryBuilder.getMany();
    
        return { appraisals, appraisalsCount };
    }

    async findOne(appraisalId: number): Promise<AppraisalRO> {
        const appraisal = await this.appraisalRepository.findOne(queryFindOneByIdentifier(appraisalId));
        if (appraisal) {
            return { appraisal };
        }
        throw new HttpException({ message: "Appraisal not found." }, HttpStatus.NOT_FOUND);
    }

    async create(appraisalData: CreateAppraisalDto): Promise<CommonResponseDto> {
        const appraisal = new AppraisalEntity();
        appraisal.employeeId = appraisalData.employeeId;
        appraisal.evaluationDate = appraisalData.evaluationDate;
        appraisal.evaluatorName = appraisalData.evaluatorName;
        appraisal.notes = appraisalData.notes;

        const createdAppraisal = await this.appraisalRepository
            .save(appraisal)
            .catch((error) => {
                throw new HttpException({ message: "Error occurred while saving appraisal", error }, HttpStatus.INTERNAL_SERVER_ERROR);
            });

        return { status: "SUCCESS", data: createdAppraisal };
    }

    async update(appraisalId: number, appraisalData: UpdateAppraisalDto): Promise<CommonResponseDto> {
        let toUpdate = await this.appraisalRepository.findOne(queryFindOneByIdentifier(appraisalId));
        if (toUpdate) {
            let updated = Object.assign(toUpdate, appraisalData);
            const appraisal = await this.appraisalRepository
                .save(updated)
                .catch((error: any) => {
                    throw new HttpException({ message: "Error occurred while updating appraisal", error }, HttpStatus.INTERNAL_SERVER_ERROR);
                });

            return { status: "SUCCESS", data: appraisal };
        }
        throw new HttpException({ message: "Error occurred while updating appraisal", error: "appraisal doesn't exists" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    async delete(appraisalId: number): Promise<CommonResponseDto> {
        let toDelete = await this.appraisalRepository.findOne(queryFindOneByIdentifier(appraisalId));
        if (toDelete) {
            let deletedAppraisal = Object.assign(toDelete, { deleted: true });
            await this.appraisalRepository
                .save(deletedAppraisal)
                .catch((error: any) => {
                    throw new HttpException({ message: "Error occurred while deleting appraisal", error }, HttpStatus.INTERNAL_SERVER_ERROR);
                });
            return { status: "SUCCESS" };
        }
        throw new HttpException({ message: "Error occurred while deleting appraisal", error: "appraisal doesn't exists" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
