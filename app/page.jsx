
"use client"
import React, {useState,useRef, useContext, useEffect} from 'react';
import {ClientAppContext} from "@/context/ClientContextProvider";
import RecurrenceDatePicker from "@/app/RecurrenceDatePicker";
import {isBefore, isValid} from "@/utils/dateUtilityMethods";
// import {isBefore, isValid} from "date-fns";
import WeekDaysBtns from "@/components/WeekDaysBtns.jsx";
import CustomOptionsforYear from "@/components/CustomOptionsforYear.jsx";
import Navbar from "@/components/Navbar.jsx";

const Home = () => {
    const {
        freq,
        setFreq,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        count,
        setCount,
    } = useContext(ClientAppContext);


    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const getFieldErrors =(field) => {
        return errors[field] ? errors[field] : null;
    }
    const validateForm = () => {
        const newErrors = {};
        if(!startDate){
            newErrors.startDate = "Start Date is required";
        }else if(!isValid(new Date(startDate))){
            newErrors.startDate = "Invalid Start Date";
        }

        if(endDate){
            if(!isValid(new Date(endDate))){
                newErrors.endDate = "Invalid End Date";
            }else if(startDate && (isBefore(new Date(endDate),new Date(startDate)))){
                newErrors.endDate = "End Date cannot be before Start Date";
            }else if(isBefore(new Date(endDate),new Date())){
                newErrors.endDate = "End Date cannot be in the past";
            }
        }
        if(!freq){
            newErrors.freq = "Frequency is required";
        }
        if(count && (isNaN(count) || parseInt(count) < 0 || parseInt(count) >365) ){
            newErrors.count = "Count must be between 1 and 365";
        }
        setErrors(newErrors);
        const formValid =Object.keys(newErrors).length === 0 && startDate && freq;
        setIsFormValid(formValid);
        return Object.keys(newErrors).length === 0;
    }

    useEffect(() => {
        validateForm();
    },[startDate,endDate,freq,count]);

    const handleFreqSelection = (e) => {
        const selectedFreq = e.target.value;
        setFreq(selectedFreq);
        console.log("freq selected: ",selectedFreq);
    }
    const handleStartDate = (e) => {
        const selectedStDate = e.target.value;
        setStartDate(selectedStDate);
        console.log("Start Date: ",selectedStDate);
    }
    const handleEndDate = (e) => {
        const selectedEndDate = e.target.value;
        setEndDate(selectedEndDate);
        console.log("End Date: ",selectedEndDate);
    }
    const handleCount = (e) => {
        const selectedCount = e.target.value;
        setCount(selectedCount);
        console.log("Max Occurences: ",selectedCount);
    }
    const tempRef = useRef(null);


        return (
            <>
                <main className="w-full min-h-screen max-h-fit flex flex-col bg-slate-900  text-indigo-300 overflow-x-hidden">
                    <Navbar />
                    <div className="w-full flex-1 flex flex-col md:flex-row gap-2 md:gap-5 p-2 md:p-4  overflow-y-auto">
                        {/* Left Panel */}
                        <div className='w-full md:w-[65%] lg:w-[60%] h-full flex flex-col rounded-lg bg-slate-800 gap-2 md:gap-3 '>
                            <div className="w-full  flex-1 flex flex-col gap-2 md:gap-4 p-2 md:p-4 overflow-y-auto">
                                {/* Frequency Selector */}
                                <div className="w-full max-w-[600px] mx-auto px-2 h-24">
                                    <div className="relative w-full h-full  flex flex-col justify-center items-center p-2 rounded-lg">
                                        <label htmlFor="frequency" className="absolute top-2 left-4 text-sm md:text-lg">Frequency</label>
                                        <select
                                            id="frequency"
                                            name="recurring_options"
                                            value={freq || ''}
                                            className="text-base md:text-lg w-full mt-6 h-10 md:h-12 px-2 border-2 text-indigo-300 border-slate-600 focus:outline-none rounded-full"
                                            onChange={handleFreqSelection}
                                        >
                                            <option value="" className="text-slate-900">Select frequency</option>
                                            <option value="daily" className="text-slate-900">daily</option>
                                            <option value="weekly" className="text-slate-900">weekly</option>
                                            <option value="monthly" className="text-slate-900">monthly</option>
                                            <option value="yearly" className="text-slate-900">yearly</option>
                                        </select>
                                        {getFieldErrors('freq') && (
                                            <span className="text-red-400 text-xs mt-1">{getFieldErrors('freq')}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Dynamic Components */}
                                {freq === 'weekly' && (
                                    <div className="w-full px-2 sm:px-7 md:px-7 lg:px-7">
                                        <WeekDaysBtns />
                                    </div>
                                )}
                                {freq === 'monthly' && (
                                    <div className="w-full max-w-[580px] mx-auto px-2 ">
                                        <CustomOptionsforYear />
                                    </div>
                                )}

                                {/* Repeat Interval */}
                                <div className="w-full max-w-[600px] mx-auto px-2 h-32">
                                    <div className="relative w-full h-full  flex flex-col justify-center items-center p-2 rounded-lg">
                                        <label htmlFor="repeat-interval" className="absolute top-2 left-4 text-sm md:text-lg">Repeat every</label>
                                        <input
                                            id="repeat-interval"
                                            type="number"
                                            value={count || 0}
                                            min="1"
                                            max="365"
                                            className="text-base md:text-lg mt-6 w-full h-10 md:h-12 border-2 p-2 px-4 bg-transparent border-slate-600 rounded-full placeholder:text-indigo-300 text-indigo-300 focus:outline-none"
                                            onChange={handleCount}
                                            ref={tempRef}
                                        />
                                        {freq === 'daily' && <span className="absolute bottom-1 left-4 text-sm md:text-base">days</span>}
                                        {freq === 'weekly' && <span className="absolute bottom-1 left-4 text-sm md:text-base">weeks</span>}
                                        {freq === 'monthly' && <span className="absolute bottom-1 left-4 text-sm md:text-base">months</span>}
                                        {freq === 'yearly' && <span className="absolute bottom-1 left-4 text-sm md:text-base">years</span>}
                                        {getFieldErrors('count') && (
                                            <span className="text-red-400 text-xs mt-1">{getFieldErrors('count')}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Date Range */}
                                <div className="w-full max-w-[580px] mx-auto  flex flex-col sm:flex-row justify-around items-center p-2 rounded-lg">
                                    <div className="w-full sm:w-1/2 h-full flex flex-col justify-center gap-1 p-2">
                                        <label htmlFor="start-date" className="text-sm md:text-lg">Start Date</label>
                                        <input
                                            id="start-date"
                                            type="date"
                                            value={startDate || ''}
                                            onChange={handleStartDate}
                                            className="p-2 h-10 w-full text-indigo-300 border-2 border-slate-600 focus:outline-none rounded-full"
                                        />
                                    </div>
                                    <div className="relative w-full sm:w-1/2 h-full flex flex-col justify-center gap-1 p-2">
                                        <label htmlFor="end-date" className="text-sm md:text-lg">End Date (optional)</label>
                                        <input
                                            id="end-date"
                                            type="date"
                                            value={endDate || ''}
                                            onChange={handleEndDate}
                                            className="p-2 h-10 w-full text-indigo-300 border-2 border-slate-600 focus:outline-none rounded-full"
                                        />
                                        {getFieldErrors('endDate') && (
                                            <span className="absolute bottom-[-12px] ml-3 text-red-400 text-xs mt-3">{getFieldErrors('endDate')}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Form Validation Message */}
                                <div className="w-full text-center p-2">
                                    {isFormValid ? (
                                        <p className="text-indigo-300">got some dates . . . </p>
                                    ) : (
                                        <p className="text-cyan-400">Start date is required!</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Panel */}
                        <div className="w-full md:w-[35%] lg:w-[30%] h-full rounded-lg bg-slate-800 overflow-hidden">
                            <RecurrenceDatePicker />
                        </div>
                    </div>
                </main>
            </>
        );
};

export default Home;
