"use client"
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {AppContext} from "@/app/ContextProvider";
import {addDays, addMonths, addWeeks, addYears, formatDate, isAfter,
    isBefore, isSameDay, isValid,getNextWeekday,
    getNextOccurence,getNextOccurrences   } from '@/utils/dateUtilityMethods'
// import { addMonths, addWeeks, addYears, format, isAfter, isBefore, isSameDay, isValid} from 'date-fns'
// import {addDays} from "@/utils/dateUtilityMethods";


// import {console} from "next/dist/compiled/@edge-runtime/primitives";

const RecurrenceDatePicker = () => {
    const { freq,
        startDate,
        setStartDate,
        setEndDate,
        setCount,
        setFreq,
        endDate,
        count,
        selectedWeekDays,
        resultantDays,
        setResultantDays,
        selectedCustomOption,
        setSelectedCustomOption,
    } = useContext(AppContext);

    // const [dailyDays, setDailyDays] = useState([]);
    // const [resultantDays, setResultantDays] = useState([]);


    // useEffect(() => {
    //     if(!isValid(new Date(startDate))){
    //         setNextDate(undefined);
    //     }
    // },[startDate,freq,endDate,count]);


    const calculateNextDate = useMemo(() => {
        return ()=> {
            console.log("Calculating next date with:", {
                startDate,
                endDate,
                freq,
                count
            });
            // Return null if required fields are missing or invalid
            if (!startDate || !freq) {
                console.log("Missing required fields");
                return null;
            }

            if (!isValid(new Date(startDate))) {
                console.log("Invalid start date");
                return null;
            }

            // Validate end date if provided
            if (endDate && !isValid(new Date(endDate))) {
                console.log("Invalid end date");
                return null;
            }

            // Check if count is valid when provided
            // if (count && (isNaN(count) || parseInt(count) <= 0)) {
            //     console.log("Invalid count");
            //     return null;
            // }

            let currDate = new Date(startDate);
            // console.log("type of currDate: " ,typeof currDate);
            // let currDate;
            const now = new Date();
            let iterations = 0;
            const maxCount = count ? parseInt(count) : null;

            console.log("Starting calculation from 1st value of currDate:", currDate);


            if (isAfter(currDate, now) || isSameDay(currDate,now)) {
                // Check if it's within end date range
                if (endDate && isAfter(currDate, new Date(endDate))) {
                    console.log("Start date is after end date");
                    return null;
                }
                console.log("Start date is in future , moving to while loop:", currDate);
                // return dailyDays;
            }
            // else if(isBefore(currDate,now)){
            //     console.log("Start date is in past, returning:", currDate);  // need to handle
            //     return dailyDays;
            // }

            //  between


            // if(!startDate || isValid(new Date(startDate))) return null;
            // if(isBefore(new Date(startDate),new Date())) return null;
            // if(endDate && isBefore(new Date(endDate),new Date()))return null;
            // if(count && count <= 0) return null;

            // let currDate = new Date(startDate);
            // let iterations = 0;
            // const now = new Date();

            // if(isAfter(currDate,now)){
            //     if(!endDate || isBefore(endDate,now)){
            //         return  currDate;
            //     }
            //     return null;
            // }
            let tempDatesArray = [];
            // while (count ? iterations < count:true) {
            while (true) {
                if (endDate && isAfter(currDate, new Date(endDate))) {
                    console.log("Start date is after end date");
                    return null;
                }
                switch (freq) {
                    case 'daily':{
                        const repeatInterval = count ?count :1;
                        console.log("Raw currDate before adding:", currDate);
                        console.log("Time value (ms):", currDate.getTime());
                            tempDatesArray.push(currDate);
                            setResultantDays(tempDatesArray);
                            console.log("daily Days after pushing currDate: ",tempDatesArray);
                            console.log("Repeat Interval: ",repeatInterval);
                            // const newDate = new Date(currDate);
                            // newDate.setDate(newDate.getDate() + repeatInterval);
                            // currDate = newDate;
                        currDate = addDays(currDate, repeatInterval);
                        console.log("currDate after adding days: ",currDate);
                        break;
                    }
                    case 'weekly':{
                        console.log("Selected days of week in switch block: ",selectedWeekDays);
                        const repeatInterval = count ?count :1;
                        const tempDays = [];
                        selectedWeekDays.forEach((day)=>{
                            tempDays.push(getNextWeekday(currDate,day));
                        })
                        tempDatesArray.push(...tempDays);
                        setResultantDays(tempDatesArray);
                        // console.log("Selected days of week: ",selectedWeekDays);
                        console.log("tempDays: ",tempDays);
                        console.log("currDate: ",currDate);
                        console.log('Resultant days: ', tempDatesArray);
                        const nextCurrDateIdx = tempDatesArray.length - tempDays.length;
                        // currDate = addWeeks(currDate, 1);
                        const nextCurrDate = new Date(tempDatesArray[nextCurrDateIdx]);
                        currDate = addWeeks(nextCurrDate, repeatInterval);
                        break;
                    }
                    case 'monthly':{
                        const repeatInterval = count !== '0' || count === '' ?count :0;
                        console.log("Selected Custom Option in switch:",selectedCustomOption);
                        let currentDate = new Date(currDate);
                        console.log("Current Date in monthly before: ",currentDate);
                            const nextOccurrence = getNextOccurence(selectedCustomOption.dayNo,selectedCustomOption.weekNo, currentDate);
                            if (nextOccurrence) {
                                tempDatesArray.push(nextOccurrence);
                                setResultantDays(tempDatesArray);
                                const nextOccurrenceMonth = repeatInterval ? Number(Number((Number(nextOccurrence.getMonth()) + Number(repeatInterval)) % 12) + 1): null;

                                // left here
                                // logs for debugging and fixing
                                console.log("nextOccurrenceMonth: ",nextOccurrenceMonth);
                                console.log("nextOccurrence.getMonth(): ",nextOccurrence.getMonth());
                                console.log("nextOccurrence.getMonth() + Number(repeatInterval): ",Number(Number(nextOccurrence.getMonth()) + Number(repeatInterval)));
                                console.log("nextOccurrence.getMonth() + Number(repeatInterval) % 12: ",Number((Number(nextOccurrence.getMonth()) + Number(repeatInterval)) % 12));

                                const nextOccurrenceYear = repeatInterval ? Number(Number(nextOccurrence.getMonth()) + Number(repeatInterval)) > 11 ? Number(nextOccurrence.getFullYear()) + Number(1) : Number(nextOccurrence.getFullYear()) : null;

                                console.log("nextOccurrenceYear: ",nextOccurrenceYear); // log to debug

                                // Set reference date to day after this occurrence for next iteration
                                currDate = repeatInterval ? new Date(parseInt(nextOccurrenceYear.toString()),nextOccurrenceMonth,1) : new Date(nextOccurrence);
                                console.log("Current Date in monthly after: ",currDate);
                            }
                        break;
                    }
                    case 'yearly':{
                        const repeatInterval = count ?count :1;
                        tempDatesArray.push(currDate);
                        setResultantDays(tempDatesArray);
                        currDate = addYears(currDate, repeatInterval);
                        break;
                    }
                    default:
                        console.log("Invalid frequency");
                        return null
                }
                iterations++;

                if (endDate && isAfter(currDate, new Date(endDate))) {
                            console.log("Next date exceeds end date");
                            return null;
                }

                if (iterations > 20) {
                    console.log("Too many iterations, breaking");
                    // return resultantDays;
                    break;
                }
            }
            return resultantDays;
        }
    }, [startDate,freq,count,selectedWeekDays,endDate,selectedCustomOption]);

    // get next recurring date on every load
    useEffect(() => {
        console.log("Dependencies changed, updating nextDate");
        console.log("daily Days before calling calculateNextDate: ",resultantDays);
        calculateNextDate();
        console.log("daily Days after calling calculateNextDate: ",resultantDays);
    }, [startDate,freq,count,selectedWeekDays,endDate,selectedCustomOption]);

    // useEffect(() => {
    //     const dates = localStorage.getItem('resultantDays');
    //     console.log("dates from local storage: ",dates);
    //     setResultantDays(dates ? JSON.parse(dates) : []);
    //     const stDate = localStorage.getItem('startDate');
    //     const newFreq = localStorage.getItem('freq');
    //     const newCount = localStorage.getItem('startDate');
    //     const newEndDate = localStorage.getItem('endDate');
    //     console.log("stDate from local storage:",stDate);
    //     console.log("freq from local storage:",newFreq);
    //     console.log("newCount from local storage:",newCount);
    //     console.log("newEndDate from local storage:",newEndDate);
    //
    //     setStartDate(stDate?stDate : null);
    //     setFreq(newFreq);
    //     setCount(newCount?Number(newCount):0);
    //     setEndDate(newEndDate? newEndDate : null);
    // }, []);

    // useEffect(() => {
    //     console.log("daily Days after state update: ", resultantDays);
    //     const datesArr = [...resultantDays];
    //     localStorage.setItem('resultantDays', JSON.stringify(datesArr));
    //     const stDate = new Date(startDate);
    //     const newFreq = freq;
    //     const newEndDate = new Date(endDate);
    //     const newCount = Number(count);
    //     localStorage.setItem('startDate', JSON.stringify(datesArr));
    //     localStorage.setItem('freq', JSON.stringify(datesArr));
    //     localStorage.setItem('count', JSON.stringify(datesArr));
    //     localStorage.setItem('endDate', JSON.stringify(datesArr));
    //
    // }, [resultantDays]);

    useEffect(() => {
        console.log("daily Days after state update: ", resultantDays);
    }, [resultantDays]);

    return (
        <>
           {/*<div className="w-full h-full flex flex-row flex-wrap overflow-y-auto justify-center items-center">*/}
            <div className="w-full h-full flex flex-col justify-center items-center py-4">
               <h3 className=" text-lg font-bold mb-2 text-blue-950">Recurring Dates :</h3>

               {resultantDays.length > 0?
                   resultantDays.map((date,index)=>{
                       // return (<p key={index}><strong>{`${new Date(date).toString().split(' ')[0]}  ${formatDate(date)}`}</strong></p>)

                       return (<div className="w-full h-12 text-lg text-center py-1.5 ring-[1px] ring-slate-900  "
                           key={index}>{`${new Date(date).toString().split(' ')[0]} ${new Date(date).toString().split(' ')[1]} ${new Date(date).toString().split(' ')[2] } ${new Date(date).toString().split(' ')[3]}`}</div>)

                   })
                   :
                   (<p>No more dates to display</p>)
               }
           </div>
        </>
    );
};

export default RecurrenceDatePicker;