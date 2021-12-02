import { Controller, Get, Post, Body, Query, Param, Delete, Patch, UseInterceptors, UploadedFile, Res, UploadedFiles } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmployeeRO, EmployeesRO } from './employee.interface';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer"; 
import { EMPLOYEE_FILE_FOLDER, EMPLOYEE_IMAGE_FOLDER } from '../config';
import { editFileName, imageFileFilter } from '../common/utils/file-upload.util';
import { UploadGovementIdDto } from './dto/upload-government-id.dto';
import { CommonResponseDto } from '../common/dto/common-response.dto';
import { UpdateGovementIdDto } from './dto/update-government-id.dto';

@ApiBearerAuth()
@ApiTags('Employee(s) Endpoint')
@Controller()
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @ApiOperation({ summary: 'Get all employees' })
    @ApiResponse({ status: 200, description: 'Return all employees.' })
    @Get("employees")
    async findAll(@Query() query): Promise<EmployeesRO> {
      return await this.employeeService.findAll(query);
    }
  
    @Get('employees/:employeeIdNumber')
    async findOne(@Param('employeeIdNumber') employeeIdNumber) {
      return await this.employeeService.findOne(employeeIdNumber);
    }

    @ApiOperation({ summary: 'Create employee' })
    @ApiResponse({ status: 201, description: 'The employee has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Post("employee")
    async create(@Body('employee') employee: CreateEmployeeDto) {
        return this.employeeService.create(employee);
    }

    @ApiOperation({ summary: 'Delete employee' })
    @ApiResponse({ status: 201, description: 'The employee has been successfully deleted.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Delete('employee/:id')
    async delete(@Param() params) {
        return this.employeeService.delete(params.id);
    }
    
    @Post("employee/uploadProfile/:employeeId")
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: EMPLOYEE_IMAGE_FOLDER,
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
    )
    async uploadedImage(@Param('employeeId') employeeId: number, @UploadedFile() file) {
      return this.employeeService.uploadProfile(employeeId, file.filename);
    }

    @Post("employee/uploadGovernmentId")
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: EMPLOYEE_FILE_FOLDER,
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
    )
    async uploadedGovernmentId(@Body() requestBody: any, @UploadedFile() file) {
      const governmentIdData: UploadGovementIdDto = {
          employeeId: requestBody.employeeId,
          idNumber: requestBody.idNumber,
          name: requestBody.name
      }
      return this.employeeService.uploadGovernmentId(governmentIdData, file.filename);
    }

    @Patch("employee/updateProfile/:employeeId")
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: EMPLOYEE_IMAGE_FOLDER,
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
    )
    async updatedImage(@Param('employeeId') employeeId: number, @UploadedFile() file) {
      return this.employeeService.updateProfile(employeeId, file?.filename);
    }

    @Patch("employee/updateGovernmentId")
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: EMPLOYEE_FILE_FOLDER,
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
    )
    async updatedGovernmentId(@Body() requestBody: any, @UploadedFile() file) {
      const governmentIdData: UpdateGovementIdDto = {
          employeeId: requestBody.employeeId,
          idNumber: requestBody.idNumber,
          name: requestBody.name
      }
      return this.employeeService.updateGovernmentId(governmentIdData, file?.filename);
    }

    @ApiOperation({ summary: 'Update employee' })
    @ApiResponse({ status: 201, description: 'The employee has been successfully updated.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Patch('employee/:id')
    async update(@Param() params, @Body('employee') employeeData: UpdateEmployeeDto) {
        return this.employeeService.update(params.id, employeeData);
    }
    
    @Get('employee/images/:imageFileName')
    seeUploadedFile(@Param('imageFileName') image, @Res() res) {
      return res.sendFile(image, { root: EMPLOYEE_IMAGE_FOLDER });
    }

    @Get('employee/govids/:imageFileName')
    seeUploadedDoc(@Param('imageFileName') image, @Res() res) {
      return res.sendFile(image, { root: EMPLOYEE_FILE_FOLDER });
    }
}
