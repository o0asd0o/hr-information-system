import { Controller, Get, Post, UsePipes, Body, HttpException, Put, UseInterceptors, UploadedFile, Param, Res, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRO } from './user.interface';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../common/utils/file-upload.util';
import { USER_IMAGE_FOLDER } from '../config';

@ApiBearerAuth()
@ApiTags('System User Endpoint')
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UsePipes(new ValidationPipe())
    @Post('users/login')
    async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserRO | { loginTye: "token" | "credentials"}> {
        const _user = await this.userService.findByCredentials(loginUserDto);
        if (loginUserDto.token) {
          const { profilePicture, username, firstName, lastName } = _user;
          const user = { profilePicture, token: loginUserDto.token, username, firstName, lastName };
          return { user, status: "SUCCESS", loginTye: "token" };
        } 

        const errors = { User: ' not found' };
        if (!_user) throw new HttpException({ errors }, 401);

        const token = await this.userService.generateJWT(_user);
        const { profilePicture, username, firstName, lastName } = _user;
        const user = { profilePicture, token, username, firstName, lastName };

        return { user, status: "SUCCESS", loginTye: "credentials" };
    }

    @Patch('user')
    async update(@User('id') userId: number, @Body('user') userData: UpdateUserDto) {
      return await this.userService.update(userId, userData);
    }

    @UsePipes(new ValidationPipe())
    @Post('user')
    async create(@Body('user') userData: CreateUserDto) {
      return this.userService.create(userData);
    }

    @Post("user/uploadProfile")
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: USER_IMAGE_FOLDER,
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    async uploadedFile(@User('id') userId: number, @UploadedFile() file) {
      return this.userService.uploadProfile(userId, file.filename);
    }
    
    @Get('user/images/:imageFileName')
    seeUploadedImage(@Param('imageFileName') image, @Res() res) {
      return res.sendFile(image, { root: USER_IMAGE_FOLDER });
    }
}
