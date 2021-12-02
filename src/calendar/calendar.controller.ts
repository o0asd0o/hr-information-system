import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CalendarRO } from './calendar.interface';
import { CalendarService } from './calendar.service';

@Controller("calendar")
export class CalendarController {
    constructor(private readonly calendarService: CalendarService) {}

    @ApiOperation({ summary: 'Get all events' })
    @ApiResponse({ status: 200, description: 'Return all events.' })
    @ApiQuery({ name: "limit", type: "number", required: false })
    @ApiQuery({ name: "offset", type: "number", required: false })
    @Get("events")
    async findAllEvents(@Query() query): Promise<CalendarRO> {
      return await this.calendarService.findAll(query);
    }
}
