import * as moment from "moment";


export const getDateDifference = (start: Date, end: Date): moment.Duration => { 
    const endDate = moment(end);
    const startDate = moment(start);

    return moment.duration(endDate.diff(startDate));
};
