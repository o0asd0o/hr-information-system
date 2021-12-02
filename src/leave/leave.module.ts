import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from '../employee/employee.entity';
import { AuthMiddleware } from '../user/auth.middleware';
import { UserModule } from '../user/user.module';
import { LeaveController } from './leave.controller';
import { LeaveEntity } from './leave.entity';
import { LeaveService } from './leave.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([LeaveEntity, EmployeeEntity]),
        UserModule,
    ],
    controllers: [LeaveController],
    providers: [LeaveService],
})
export class LeaveModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        .forRoutes(
          { path: 'leave', method: RequestMethod.POST },
          { path: 'leaves', method: RequestMethod.GET },
          { path: 'leaves/:leaveId', method: RequestMethod.GET },
          { path: 'leaves/:leaveId', method: RequestMethod.PATCH },
          { path: 'leaves/:leaveId', method: RequestMethod.DELETE },
          { path: 'leaves/summary/:employeeId', method: RequestMethod.GET },
        );
    }
}

