"use client"
export const addDays = (date, days) => {
    const result = new Date(date);
    console.log("result: ",result);
    // const desiredDate = Number(result.getDate()) + Number(days);
    // console.log("desiredDate: ",desiredDate);
    result.setDate(Number(result.getDate()) + Number(days));
    return result;
};
export const addMonths = (date, months) => {
    const result = new Date(date);
    result.setMonth(Number(result.getMonth()) + Number(months));
    return result;
};
export const addYears = (date, years) => {
    const result = new Date(date);
    result.setFullYear(Number(result.getFullYear()) + Number(years));
    return result;
};
export const addWeeks = (date, weeks) => {
    const result = new Date(date);
    result.setDate(Number(result.getDate()) + Number(weeks * 7));
    return result;
};
export const formatDate = (receivedDate) => {
    const date = new Date(receivedDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month =( date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    // console.log("day: ",day);
    // console.log("month: ",month);
    // console.log("year: ",year);
    // console.log(`Resultant formatted Date:  ${day}-${month}-${year}`);
    return `${day}-${month}-${year}`;
};
export const isAfter = (date1, date2) => {
    const t1 = date1.getTime();
    const t2 = date2.getTime();
    return t1 > t2;
};
export const isBefore = (date1, date2) => {
    const t1 = date1.getTime();
    const t2 = date2.getTime();
    return t1 < t2;
};
export const isSameDay = (date1, date2) => {
    const t1 = date1.getTime();
    const t2 = date2.getTime();
    return t1 === t2;
};
export const  isValid = (date)=> {
    // Handle null, undefined
    if (date == null) return false;

    // Handle arrays, objects (except Date), functions
    if (typeof date === 'object' && !(date instanceof Date)) return false;
    if (typeof date === 'function') return false;

    // Convert to Date
    const d = new Date(date);

    // Check if it's a valid date
    return d instanceof Date && !isNaN(d.getTime());
}

export const getNextWeekday = (startDate, targetDay) =>{
    const start = new Date(startDate);
    const startDay = Number(start.getDay());
    const daysToAdd = Number(Number(targetDay - startDay + 7) % 7);

    const nextDate = new Date(start);
    nextDate.setDate(Number(start.getDate()) + Number(daysToAdd));
    return nextDate;
}

// func to get the selected day in selected week No
const getNthWeekDayofMonth = (year,month,dayNo,weekNo) => {
    const firstDay = new Date(year,month,1); // returns first date of the month
    const firstDayNo = firstDay.getDay();  // get dayNo of the first date

    let daysToAdd = Number(Number(dayNo - firstDayNo) + 7) % 7;
    // calculates no of days b/w target day(ie dayNo) and ref day(ie firstDayNo)

    daysToAdd += Number(weekNo - 1) * 7;
    console.log("daysToAdd: ",daysToAdd);

    const result = new Date(year,month,Number(Number(1) + Number(daysToAdd)));
    if(result.getMonth() !== month){
        console.log("Month is not same,bug in getNthWeekDayofMonth()");
        return null;
    }
    return result;
}

export const getNextOccurence = (dayNo,weekNo,referenceDate = new Date())=>{
    const currentYear = referenceDate.getFullYear();
    const currentMonth = referenceDate.getMonth();
    let targetDate = getNthWeekDayofMonth(currentYear,currentMonth,dayNo,weekNo);

    if (!targetDate || targetDate < referenceDate) {
        const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
        const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

        targetDate = getNthWeekDayofMonth(nextYear, nextMonth, dayNo, weekNo);
    }
    console.log("targetDate: ",targetDate);
    return targetDate;
}

