import { LeaveModule } from './leave/leave.module';
import { DocumentModule } from './document/document.module';
import { DivisionModule } from './division/division.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EmployeeModule } from './employee/employee.module'
import { Connection } from "typeorm";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppraisalModule } from './appraisal/appraisal.module';
import { CalendarModule } from './calendar/calendar.module';
import { MiscModule } from './misc/misc.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, EmployeeModule,
    DivisionModule, DocumentModule, LeaveModule, AppraisalModule,
    CalendarModule, MiscModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
