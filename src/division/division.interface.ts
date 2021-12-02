import { DivisionEntity } from "./division.entity";

export interface DivisionRO {
    division: DivisionEntity;
}
  
export interface DivisionsRO {
    divisions: DivisionEntity[];
    divisionsCount: number;
}