import { DocumentService } from './document.service';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GovernmentIdEntity } from '../employee/sub.entities/government.entity';
import { AddressEntity } from '../employee/sub.entities/address.entity';
import { EmployeeEntity } from '../employee/employee.entity';
import { UserModule } from '../user/user.module';
import { ONBOARDING_DOCS_FOLDER } from "../config";
import { DocumentController } from './document.controller';
import { AuthMiddleware } from '../user/auth.middleware';
import { DocumentEntity } from './document.entity';

@Module({
    imports: [
        MulterModule.register({ dest: ONBOARDING_DOCS_FOLDER }),
        TypeOrmModule.forFeature([DocumentEntity]),
        UserModule,
    ],
    controllers: [DocumentController],
    providers: [DocumentService],
})
export class DocumentModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        .forRoutes(
          { path: 'document', method: RequestMethod.POST },
          { path: 'documents', method: RequestMethod.GET },
          { path: 'documents/:documentId', method: RequestMethod.GET },
          { path: 'documents/:documentId', method: RequestMethod.PATCH },
          { path: 'documents/:documentId', method: RequestMethod.DELETE },
        );
    }
}
