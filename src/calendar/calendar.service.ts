import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { CalendarRO } from './calendar.interface';
import { AppraisalEntity } from '../appraisal/appraisal.entity';
import { LeaveEntity } from '../leave/leave.entity';
import { EmployeeEntity } from '../employee/employee.entity';
import { EventDto, EventType } from './dto/event.dto';
import * as moment from "moment";
import { titleCase } from "title-case";
import { queryFindOneByIdentifier } from '../common/queries/find-one.query';
import { LeaveStatus } from '../leave/enums/leave.enum';
import { EmployeeFieldsDto } from './dto/employee-fields.dto';

const mapNecessaryFields = (employee: EmployeeEntity): EmployeeFieldsDto => {
    return {
        firstName: employee.firstName,
        lastName: employee.lastName,
        middleName: employee.middleName,
        profilePicture: employee.profilePicture,
        employeeIdNumber: employee.employeeIdNumber,
        position: employee.position,
        division: employee.divisionType
    }
};

@Injectable()
export class CalendarService {
    constructor(
        @InjectRepository(AppraisalEntity) private readonly appraisalRepository: Repository<AppraisalEntity>,
        @InjectRepository(EmployeeEntity) private readonly employeeRepository: Repository<EmployeeEntity>,
        @InjectRepository(LeaveEntity) private readonly leaveRepository: Repository<LeaveEntity>,
    ) {}

    async findAll(query: any): Promise<CalendarRO> {
        const calendarEvents = new Array<EventDto>();

        if ("employeeId" in query) {
            return this.findByEmployee(parseInt(query.employeeId));
        }

        const queryOptions =  { where: { deleted: false } };
        // appraisal
        const employeeAppraisals = await this.appraisalRepository.find(queryOptions);
        for (const record of employeeAppraisals) {
            const event = new EventDto();

            const employee = await this.employeeRepository.findOne(queryFindOneByIdentifier(record.employeeId))
            const { firstName, lastName } = employee;
            
            event.title = `${lastName}, ${firstName}'s Evaluation Day`;
            event.start = record.evaluationDate;
            event.end = moment(record.evaluationDate).add(2, "hours").toDate();
            event.employee = mapNecessaryFields(employee);
            event.redirectTo = "appraisal";
            event.type = EventType.EVALUATION;
            calendarEvents.push(event);
        }

        // leave
        const leaveQueryOptions = { where: {
            deleted: false,
            status: LeaveStatus.APPROVED
        }};

        const employeeLeaves = await this.leaveRepository.find(leaveQueryOptions);
        for (const record of employeeLeaves) {
            const event = new EventDto();

            const employee = await this.employeeRepository.findOne(queryFindOneByIdentifier(record.employeeId))
            const { firstName, lastName } = employee;
            
            event.title = `${lastName}, ${firstName} is on Leave`;
            event.start = record.leaveStartDate;
            event.end = record.leaveEndDate;
            event.employee = mapNecessaryFields(employee);
            event.redirectTo = "leave";
            event.allDay = true;
            event.type = EventType.LEAVE;
            calendarEvents.push(event);
        }

        // employee
        const employees = await this.employeeRepository.find(queryOptions);
        for (const record of employees) {
            const { firstName, lastName } = record;
            // birth day
            const event1 = new EventDto();
            event1.title = `${lastName}, ${firstName}'s Birthday!`;
            event1.start = record.birthDate;
            event1.end = record.birthDate;
            event1.allDay = true;
            event1.redirectTo = "employee";
            event1.type = EventType.BIRTHDAY;
            event1.employee = mapNecessaryFields(record);
            calendarEvents.push(event1);

            // employee anniv
            const event2 = new EventDto();
            event2.title = `${lastName}, ${firstName}'s Employment Anniversary!`;
            event2.start = record.startDate;
            event2.end = record.startDate;
            event2.allDay = true;
            event2.redirectTo = "employee";
            event2.type = EventType.ANNIVERSARY;
            event2.employee = mapNecessaryFields(record);
            calendarEvents.push(event2);
        }

        return {
            events: calendarEvents,
            eventsCount: calendarEvents.length,
        }
    }

    async findByEmployee(employeeId: number): Promise<CalendarRO> {
        const calendarEvents = new Array<EventDto>()

        const employee = await this.employeeRepository.findOne(queryFindOneByIdentifier(employeeId))

        if (!employee) {
            throw new HttpException({ message: "Employee not found" }, HttpStatus.NOT_FOUND);
        }
        
        const queryOptions =  { where: { 
            employeeId, 
            deleted: false
        }};
        
        // appraisal
        const employeeAppraisals = await this.appraisalRepository.find(queryOptions);
        for (const record of employeeAppraisals) {
            const event = new EventDto();
            
            event.title = `Evaluation Day with ${record.evaluatorName}`;
            event.start = record.evaluationDate;
            event.end = moment(record.evaluationDate).add(2, "hours").toDate();
            event.employee = mapNecessaryFields(employee);
            event.redirectTo = "appraisal";
            event.type = EventType.EVALUATION;
            calendarEvents.push(event);
        }

        const leaveQueryOptions = { where: {
            employeeId,
            deleted: false,
            status: LeaveStatus.APPROVED,
        }};
        
        const employeeLeaves = await this.leaveRepository.find(leaveQueryOptions);
        for (const record of employeeLeaves) {
            const event = new EventDto();
            
            event.title = `On a ${titleCase(record.leaveType)}`;
            event.start = record.leaveStartDate;
            event.end = record.leaveEndDate;
            event.employee = mapNecessaryFields(employee);
            event.redirectTo = "leave";
            event.allDay = true;
            event.type = EventType.LEAVE;
            calendarEvents.push(event);
        }

        const { firstName } = employee;
        // birth day
        const event1 = new EventDto();
        event1.title = `${firstName}'s Birthday!`;
        event1.start = employee.birthDate;
        event1.end = employee.birthDate;
        event1.allDay = true;
        event1.redirectTo = "employee";
        event1.type = EventType.BIRTHDAY;
        event1.employee = mapNecessaryFields(employee);
        calendarEvents.push(event1);

        // employee anniv
        const event2 = new EventDto();
        event2.title = `${firstName}'s Employment Anniversary!`;
        event2.start = employee.startDate;
        event2.end = employee.startDate;
        event2.allDay = true;
        event2.redirectTo = "employee";
        event2.type = EventType.ANNIVERSARY;
        event2.employee = mapNecessaryFields(employee);
        calendarEvents.push(event2);
        
        return {
            events: calendarEvents,
            eventsCount: calendarEvents.length,
        }
    }
}

