import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { AppraisalEntity } from '../appraisal/appraisal.entity';
import { EmployeeEntity } from '../employee/employee.entity';
import { LeaveEntity } from '../leave/leave.entity';
import { AuthMiddleware } from '../user/auth.middleware';
import { MiscService } from './misc.service';
import { MiscController } from './misc.controller';

@Module({
    imports: [TypeOrmModule.forFeature([AppraisalEntity, EmployeeEntity, LeaveEntity]), UserModule],
    controllers: [MiscController],
    providers: [MiscService],
})
export class MiscModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        .forRoutes(
          { path: 'misc/database/backup', method: RequestMethod.GET }
        );
    }
}