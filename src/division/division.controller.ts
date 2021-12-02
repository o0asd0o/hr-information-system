import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { DivisionRO, DivisionsRO } from './division.interface';
import { DivisionService } from './division.service';
import { CreateDivisionDto } from './dto/create-division.dto';
import { UpdateDivisionDto } from './dto/update-division.dto';

@Controller()
export class DivisionController {
    constructor(private readonly divisionService: DivisionService) {}

    @ApiOperation({ summary: 'Get all divisions' })
    @ApiResponse({ status: 200, description: 'Return all divisions.' })
    @ApiQuery({ name: "limit", type: "number", required: false })
    @ApiQuery({ name: "offset", type: "number", required: false })
    @Get("divisions")
    async findAll(@Query() query): Promise<DivisionsRO> {
      return await this.divisionService.findAll(query);
    }

    @ApiParam({ name: "divisionId", type: "number" })
    @Get('divisions/:divisionId')
    async findOne(@Param('divisionId') divisionId): Promise<DivisionRO> {
      return await this.divisionService.findOne(divisionId);
    }

    @ApiOperation({ summary: 'Create division' })
    @ApiResponse({ status: 201, description: 'The division has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Post('division')
    async create(@Body("division") createLeaveDto: CreateDivisionDto) {
        return this.divisionService.create(createLeaveDto);
    }

    @ApiOperation({ summary: 'Update Division' })
    @ApiResponse({ status: 201, description: 'The division has been successfully updated.' })
    @ApiParam({ name: "divisionId", type: "number" })
    @Patch('divisions/:divisionId')
    async update(@Param() params, @Body("division") updateDivisionDto: UpdateDivisionDto) {
        return this.divisionService.update(params.divisionId, updateDivisionDto);
    }

    @ApiOperation({ summary: 'Delete division request' })
    @ApiResponse({ status: 201, description: 'The leave request has been successfully deleted.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiParam({ name: "divisionId", type: "number" })
    @Delete('divisions/:divisionId')
    async delete(@Param() params) {
        return this.divisionService.delete(params.divisionId);
    }
}
