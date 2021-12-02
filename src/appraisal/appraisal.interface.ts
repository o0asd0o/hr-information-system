import { AppraisalEntity } from "./appraisal.entity";

export interface AppraisalRO {
    appraisal: AppraisalEntity;
}
  
export interface AppraisalsRO {
    appraisals: AppraisalEntity[];
    appraisalsCount: number;
}