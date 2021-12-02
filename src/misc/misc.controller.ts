import { Controller, Get } from '@nestjs/common';
import { MiscService } from './misc.service';

@Controller("misc")
export class MiscController {
    constructor(private readonly miscService: MiscService) {}

    @Get('database/backup')
    async backup() {
        return this.miscService.backupDatabase();
    }
}
