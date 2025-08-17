"use client"

import React, {useContext, useState} from 'react';
import {ClientAppContext} from "@/context/ClientContextProvider.jsx";
// import {monthsInYear} from "date-fns/constants";

const CustomOptionsforYear = () => {

    const {selectedCustomOption, setSelectedCustomOption} = useContext(ClientAppContext);
    // const emptyText = {text:''};
    const [inputOption, setInputOption] = useState('');

    const options = [{ label: 'first', value: 1},
        { label: 'second', value: 2},
        { label: 'third', value: 3},
        { label: 'fourth', value: 4},]
    const customWeekDays = [{dayName:'Sunday',value:0,isSelected:false},
        {dayName:'Monday',value:1,isSelected:false},
        {dayName:'Tuesday',value:2,isSelected:false},
        {dayName:'Wednesday',value:3,isSelected:false},
        {dayName:'Thursday',value:4,isSelected:false},
        {dayName:'Friday',value:5,isSelected:false},
        {dayName:'Saturday',value:6,isSelected:false}
    ];

    const handleCustomOptionSelection = (e) => {
        const rawData = e.target.value;
        const selectedOption = e.target.options[e.target.selectedIndex];
        const temp = {
            weekNo: Number(rawData.split(' ')[0]),
            dayNo: Number(rawData.split(' ')[1]),
        };
        setSelectedCustomOption(temp);
        setInputOption(selectedOption.text);
        console.log("Selected Custom Option text: ",selectedOption.text);
        console.log("Selected Custom Option: ",temp);
    }

    return (
        <div className="w-full  flex justify-center items-center">
            <select   value={selectedCustomOption || ''} className="h-12 w-full border-2 rounded-full text-lg px-3"
                    onChange={handleCustomOptionSelection}>
                <option value="">{inputOption || 'Select suitable date'}</option>
                {options.map((weekNo)=>(
                    customWeekDays.map((day,index)=>(
                        <option value={`${weekNo.value} ${day.value} `} className="text-black" key={index}>
                            {`The ${weekNo.label} ${day.dayName} of every month`}</option>
                    ))
                ))}
            </select>
        </div>
    );
};

export default CustomOptionsforYear;