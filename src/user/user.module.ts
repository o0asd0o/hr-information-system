import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { MulterModule } from '@nestjs/platform-express';
import { USER_IMAGE_FOLDER } from '../config';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [
    MulterModule.register({ dest: USER_IMAGE_FOLDER }),
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'user', method: RequestMethod.PATCH },
        { path: 'user/uploadProfile', method: RequestMethod.POST });
  }
}