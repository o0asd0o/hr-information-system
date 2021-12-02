import { EmployeeEntity } from "../employee/employee.entity";
import { EventDto } from "./dto/event.dto";
  
export interface CalendarRO {
    events: EventDto[];
    eventsCount: number;
}