import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DocumentService } from './document.service';
import { DocumentRO, DocumentsRO } from "./document.interface";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import { ONBOARDING_DOCS_FOLDER } from '../config';
import { editFileName, imageFileFilter } from '../common/utils/file-upload.util';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { CreateDocumentDto } from './dto/create-document.dto';
import { ApiCustomFileBody } from '../common/swagger/api-file-body.swagger';

@ApiBearerAuth()
@ApiTags('Onboarding Documents Endpoint')
@Controller()
export class DocumentController {
    constructor(private readonly documentService: DocumentService) {}

    @ApiOperation({ summary: 'Get documents by employee' })
    @ApiResponse({ status: 200, description: 'Return all documents of employee.' })
    @ApiQuery({ name: "employeeId", type: "number" })
    @ApiQuery({ name: "limit", type: "number", required: false })
    @ApiQuery({ name: "offset", type: "number", required: false })
    @Get("documents")
    async findEmployeeDocuments(@Query() query): Promise<DocumentsRO> {
      return await this.documentService.findByEmployeeId(query);
    }

    @ApiParam({ name: "documentId", type: "number" })
    @Get('documents/:documentId')
    async findOne(@Param('documentId') documentId): Promise<DocumentRO> {
      return await this.documentService.findOne(documentId);
    }

    @ApiOperation({ summary: 'Create document' })
    @ApiResponse({ status: 201, description: 'The document has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiConsumes("multipart/form-data")
    @ApiCustomFileBody("image", "name", "description", "employeeId")
    @Post('document')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: ONBOARDING_DOCS_FOLDER,
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    async create(@Body() requestData: any, @UploadedFile() file) { 
        const createDocumentDto: CreateDocumentDto = {
            name: requestData.name,
            description: requestData.description,
            employeeId: requestData.employeeId,
            image: file.filename,
        };
        return this.documentService.create(createDocumentDto);
    }

    @ApiOperation({ summary: 'Update document' })
    @ApiResponse({ status: 201, description: 'The document has been successfully updated.' })
    @ApiConsumes("multipart/form-data")
    @ApiParam({ name: "documentId", type: "number" })
    @ApiCustomFileBody("image", "name", "description")
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Patch('documents/:documentId')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: ONBOARDING_DOCS_FOLDER,
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    async update(@Param() params, @Body() requestData: any, @UploadedFile() file) {
        // fields should not be empty (handle on UI)
        const updateDocumentDto: UpdateDocumentDto = {
            name: requestData.name,
            description: requestData.description,
            image: file?.filename,
        };
        return this.documentService.update(params.documentId, updateDocumentDto);
    }

    @ApiOperation({ summary: 'Delete document' })
    @ApiResponse({ status: 201, description: 'The document has been successfully deleted.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiParam({ name: "documentId", type: "number" })
    @Delete('documents/:documentId')
    async delete(@Param() params) {
        return this.documentService.delete(params.documentId);
    }

    @Get('documents/images/:imageFileName')
    seeUploadedFile(@Param('imageFileName') image, @Res() res) {
      return res.sendFile(image, { root: ONBOARDING_DOCS_FOLDER });
    }
}
