import { AppraisalService } from './appraisal.service';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppraisalEntity } from './appraisal.entity';
import { UserModule } from '../user/user.module';
import { AppraisalController } from './appraisal.controller';
import { AuthMiddleware } from '../user/auth.middleware';

@Module({
    imports: [TypeOrmModule.forFeature([AppraisalEntity]), UserModule],
    controllers: [AppraisalController],
    providers: [AppraisalService],
})
export class AppraisalModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        .forRoutes(
          { path: 'appraisal', method: RequestMethod.POST },
          { path: 'appraisals', method: RequestMethod.GET },
          { path: 'appraisals/:appraisalId', method: RequestMethod.GET },
          { path: 'appraisals/:appraisalId', method: RequestMethod.PATCH },
          { path: 'appraisals/:appraisalId', method: RequestMethod.DELETE },
        );
    }
}