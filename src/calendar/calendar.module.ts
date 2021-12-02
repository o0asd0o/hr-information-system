import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { AppraisalEntity } from '../appraisal/appraisal.entity';
import { EmployeeEntity } from '../employee/employee.entity';
import { LeaveEntity } from '../leave/leave.entity';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { AuthMiddleware } from '../user/auth.middleware';

@Module({
    imports: [TypeOrmModule.forFeature([AppraisalEntity, EmployeeEntity, LeaveEntity]), UserModule],
    controllers: [CalendarController],
    providers: [CalendarService],
})
export class CalendarModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        .forRoutes(
          { path: 'calendar/events', method: RequestMethod.GET },
        );
    }
}