import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { LeaveStatus, LeaveType } from './enums/leave.enum';
import { LeaveRO, LeavesRO, LeaveSummary } from './leave.interface';
import { LeaveService } from './leave.service';

@ApiBearerAuth()
@ApiTags('Employee Leaves Endpoint')
@Controller()
export class LeaveController {
    constructor(private readonly leaveService: LeaveService) {}

    @ApiOperation({ summary: 'Get leaves by employee' })
    @ApiResponse({ status: 200, description: 'Return all leaves of employee.' })
    @ApiQuery({ name: "employeeId", type: "number" })
    @ApiQuery({ name: "limit", type: "number", required: false })
    @ApiQuery({ name: "offset", type: "number", required: false })
    @ApiQuery({ name: "leaveType", enum: LeaveType, required: false })
    @ApiQuery({ name: "status", enum: LeaveStatus, required: false })
    @Get("leaves")
    async findEmployeeLeaves(@Query() query): Promise<LeavesRO> {
      return await this.leaveService.findByEmployeeId(query);
    }

    @ApiParam({ name: "leaveId", type: "number" })
    @Get('leaves/:leaveId')
    async findOne(@Param('leaveId') leaveId) {
      return await this.leaveService.findOne(leaveId);
    }

    @ApiOperation({ summary: 'Create leave request' })
    @ApiResponse({ status: 201, description: 'The leave request has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Post('leave')
    async create(@Body("leave") createLeaveDto: CreateLeaveDto) {
        return this.leaveService.create(createLeaveDto);
    }

    @ApiOperation({ summary: 'Update leave' })
    @ApiResponse({ status: 201, description: 'The leave request has been successfully updated.' })
    @ApiParam({ name: "leaveId", type: "number" })
    @Patch('leaves/:leaveId')
    async update(@Param() params, @Body("leave") updateLeaveDto: UpdateLeaveDto) {
        return this.leaveService.update(params.leaveId, updateLeaveDto);
    }

    @ApiOperation({ summary: 'Delete leave request' })
    @ApiResponse({ status: 201, description: 'The leave request has been successfully deleted.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiParam({ name: "leaveId", type: "number" })
    @Delete('leaves/:leaveId')
    async delete(@Param() params) {
        return this.leaveService.delete(params.leaveId);
    }

    @ApiParam({ name: "employeeId", type: "number" })
    @Get('leaves/summary/:employeeId')
    async findEmployeeLeaveSummary(@Param('employeeId') employeeId) {
      return await this.leaveService.findEmployeeLeaveSummary(employeeId);
    }
}
