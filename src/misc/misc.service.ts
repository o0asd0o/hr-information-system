import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CommonResponseDto } from '../common/dto/common-response.dto';
import mysqldump from "mysqldump";
import { DATABASE_BACKUP_FOLDER } from '../config';

@Injectable()
export class MiscService {
    constructor() {}

    async backupDatabase(): Promise<CommonResponseDto> {
        const sourceFolder = __dirname.split("\\");
        sourceFolder.pop();
        sourceFolder.pop();
        
        const filePathName =  sourceFolder.join("/") + DATABASE_BACKUP_FOLDER.concat(`/company-database_backup_${new Date().getTime()}.sql`);

        await mysqldump({
            connection: {
                host: 'localhost',
                port: 3306,
                user: 'root',
                password: '',
                database: 'company_database',
            },
            dumpToFile: filePathName,
        }).catch((error) => {
            throw new HttpException({ message: "Error occurred while saving address", error }, HttpStatus.INTERNAL_SERVER_ERROR);
        });
        
        return { status: "SUCCESS" };
    }
}

