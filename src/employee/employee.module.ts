import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from './employee.entity';
import { GovernmentIdEntity } from './sub.entities/government.entity';
import { AuthMiddleware } from '../user/auth.middleware';
import { MulterModule } from '@nestjs/platform-express';
import { EMPLOYEE_IMAGE_FOLDER } from '../config';
import { UserModule } from '../user/user.module';
import { AddressEntity } from './sub.entities/address.entity';

@Module({
  imports: [
    MulterModule.register({ dest: EMPLOYEE_IMAGE_FOLDER }),
    TypeOrmModule.forFeature([EmployeeEntity, GovernmentIdEntity, AddressEntity]),
    UserModule,
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})

export class EmployeeModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'employees', method: RequestMethod.GET },
        { path: 'employees/:employeeIdNumber', method: RequestMethod.GET },
        { path: 'employee', method: RequestMethod.POST },
        { path: 'employee/:id', method: RequestMethod.PATCH },
        { path: 'employee/:id', method: RequestMethod.DELETE },
        { path: 'employee/uploadProfile/:employeeId', method: RequestMethod.POST },
        { path: 'employee/updateProfile/:employeeId', method: RequestMethod.POST },
        { path: 'employee/uploadGovernmentId', method: RequestMethod.POST },
        { path: 'employee/updateGovernmentId', method: RequestMethod.PATCH });
  }
}