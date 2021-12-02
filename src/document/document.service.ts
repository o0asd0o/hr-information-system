import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CommonResponseDto } from '../common/dto/common-response.dto';
import { queryFindOneByIdentifier } from '../common/queries/find-one.query';
import { ONBOARDING_DOCS_FOLDER } from '../config';
import { DocumentEntity } from './document.entity';
import { DocumentRO, DocumentsRO } from './document.interface';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { CreateDocumentDto } from "./dto/create-document.dto";

const fileSystem = require("fs");

@Injectable()
export class DocumentService {
    
    constructor(
        @InjectRepository(DocumentEntity) private readonly documentRepository: Repository<DocumentEntity>,
    ) {}

    async findByEmployeeId(query: any): Promise<DocumentsRO> {
        const queryBuilder = getRepository(DocumentEntity)
          .createQueryBuilder('document');

        queryBuilder.where("deleted = false");

        if (!query.employeeId) {
            throw new HttpException({ message: "employeeId is missing in the parameter." }, HttpStatus.NOT_FOUND);
        }

        queryBuilder.andWhere("document.employeeId = :employeeId", { employeeId: query.employeeId });

        const documentsCount = await queryBuilder.getCount();

        if ('limit' in query) {
            queryBuilder.limit(query.limit);
        }
    
        if ('offset' in query) {
            queryBuilder.offset(query.offset);
        }
    
        const documents = await queryBuilder.getMany();
    
        return { documents, documentsCount };
    }

    async findOne(documentId: number): Promise<DocumentRO> {
        const document = await this.documentRepository.findOne(queryFindOneByIdentifier(documentId));
        if (document) {
            return { document };
        }
        throw new HttpException({ message: "Document not found." }, HttpStatus.NOT_FOUND);
    }

    async create(documentData: CreateDocumentDto): Promise<CommonResponseDto> {
        const document = new DocumentEntity();
        document.image = documentData.image;
        document.name = documentData.name;
        document.description = documentData.description;
        document.employeeId = documentData.employeeId;

        const createdDocument = await this.documentRepository
            .save(document)
            .catch((error) => {
                throw new HttpException({ message: "Error occurred while saving document", error }, HttpStatus.INTERNAL_SERVER_ERROR);
            });

        return { status: "SUCCESS", data: createdDocument };
    }

    async update(documentId: number, documentData: UpdateDocumentDto): Promise<CommonResponseDto> {
        let toUpdate = await this.documentRepository.findOne(queryFindOneByIdentifier(documentId));
        if (toUpdate) {
            if (documentData.image) {
                try {
                    fileSystem.unlinkSync(`./${ONBOARDING_DOCS_FOLDER}/${toUpdate.image}`)
                } catch (error) {
                    console.log("There's an error deleting onboaring image")
                }
            }

            let updated = Object.assign(toUpdate, documentData);
            const employee = await this.documentRepository
                .save(updated)
                .catch((error: any) => {
                    throw new HttpException({ message: "Error occurred while updating document", error }, HttpStatus.INTERNAL_SERVER_ERROR);
                });

            return { status: "SUCCESS", data: employee };
        }
        throw new HttpException({ message: "Error occurred while updating document", error: "document doesn't exists" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    async delete(documentId: number): Promise<CommonResponseDto> {
        let toDelete = await this.documentRepository.findOne(queryFindOneByIdentifier(documentId));
        if (toDelete) {
            let deletedDocument = Object.assign(toDelete, { deleted: true });
            await this.documentRepository
                .save(deletedDocument)
                .catch((error: any) => {
                    throw new HttpException({ message: "Error occurred while deleting document", error }, HttpStatus.INTERNAL_SERVER_ERROR);
                });
            return { status: "SUCCESS" };
        }
        throw new HttpException({ message: "Error occurred while deleting document", error: "document doesn't exists" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
