import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { AppraisalRO, AppraisalsRO } from './appraisal.interface';
import { AppraisalService } from './appraisal.service';
import { CreateAppraisalDto } from './dto/create-appraisal.dto';
import { UpdateAppraisalDto } from './dto/update-appraisal.dto';

@Controller()
export class AppraisalController {
    constructor(private readonly appraisalService: AppraisalService) {}

    @ApiOperation({ summary: 'Get appraisals by employee' })
    @ApiResponse({ status: 200, description: 'Return all appraisals of employee.' })
    @ApiQuery({ name: "employeeId", type: "number" })
    @ApiQuery({ name: "limit", type: "number", required: false })
    @ApiQuery({ name: "offset", type: "number", required: false })
    @Get("appraisals")
    async findEmployeeLeaves(@Query() query): Promise<AppraisalsRO> {
      return await this.appraisalService.findByEmployeeId(query);
    }

    @ApiParam({ name: "appraisalId", type: "number" })
    @Get('appraisals/:appraisalId')
    async findOne(@Param('appraisalId') appraisalId): Promise<AppraisalRO> {
      return await this.appraisalService.findOne(appraisalId);
    }

    @ApiOperation({ summary: 'Create employee appraisal' })
    @ApiResponse({ status: 201, description: 'The appraisal has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Post('appraisal')
    async create(@Body("appraisal") createAppraisalDto: CreateAppraisalDto) {
        return this.appraisalService.create(createAppraisalDto);
    }

    @ApiOperation({ summary: 'Update appraisal' })
    @ApiResponse({ status: 201, description: 'The appraisal has been successfully updated.' })
    @ApiParam({ name: "appraisalId", type: "number" })
    @Patch('appraisals/:appraisalId')
    async update(@Param() params, @Body("appraisal") updateAppraisalDto: UpdateAppraisalDto) {
        return this.appraisalService.update(params.appraisalId, updateAppraisalDto);
    }

    @ApiOperation({ summary: 'Delete appraisal request' })
    @ApiResponse({ status: 201, description: 'The appraisal request has been successfully deleted.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiParam({ name: "apppraisalId", type: "number" })
    @Delete('appraisals/:apppraisalId')
    async delete(@Param() params) {
        return this.appraisalService.delete(params.apppraisalId);
    }
}
