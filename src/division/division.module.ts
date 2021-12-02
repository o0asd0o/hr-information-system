import { DivisionService } from './division.service';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { DivisionController } from './division.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivisionEntity } from './division.entity';
import { UserModule } from '../user/user.module';
import { AuthMiddleware } from '../user/auth.middleware';

@Module({
    imports: [TypeOrmModule.forFeature([DivisionEntity]), UserModule],
    controllers: [DivisionController],
    providers: [DivisionService],
})
export class DivisionModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        .forRoutes(
          { path: 'division', method: RequestMethod.POST },
          { path: 'divisions', method: RequestMethod.GET },
          { path: 'divisions/:divisionId', method: RequestMethod.GET },
          { path: 'divisions/:divisionId', method: RequestMethod.PATCH },
          { path: 'divisions/:divisionId', method: RequestMethod.DELETE },
        );
    }
}
