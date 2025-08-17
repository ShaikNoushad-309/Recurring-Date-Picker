
"use client"
import React, {useContext} from 'react';
import {ClientAppContext} from "@/context/ClientContextProvider";

const WeekDaysBtns = () => {
    const {selectedWeekDays, setSelectedWeekDays} = useContext(ClientAppContext);
    // const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekDays = [{dayName:'Sun',value:0,isSelected:false},
        {dayName:'Mon',value:1,isSelected:false},
        {dayName:'Tue',value:2,isSelected:false},
        {dayName:'Wed',value:3,isSelected:false},
        {dayName:'Thu',value:4,isSelected:false},
        {dayName:'Fri',value:5,isSelected:false},
        {dayName:'Sat',value:6,isSelected:false}
    ];
    // const weekBool = [false,false,false,false,false,false,false];

    // setSelectedWeekDays([]);
    // const handleWeekDaySelection = (e) => {
    //     const temp = e.target.innerText;
    //     const tempArr = [...selectedWeekDays,temp]
    //     setSelectedWeekDays(tempArr);
    //     // console.log("Selected Week Days: ",selectedWeekDays);
    //     console.log("Selected Week Days: ",tempArr);
    //
    // }

    const handleWeekDaySelection = (e) => {
        if(e.currentTarget.dataset.selected === 'true'){
            e.target.classList.add('bg-gray-700');
            e.target.classList.remove('bg-gray-800');
            const temp = e.currentTarget.dataset.value;
            const tempArr = selectedWeekDays.filter(item => item !== temp);
            const sortedWeekDays = tempArr.sort((a,b)=>(a - b));
            setSelectedWeekDays(sortedWeekDays);
            // console.log("Selected Week Days: ",selectedWeekDays);
            e.currentTarget.dataset.selected = 'false';
            console.log("Selected Week Days after removing curr: ", tempArr);
        }else {
            e.target.classList.remove('bg-gray-700');
            e.target.classList.add('bg-gray-800');
            const temp = e.currentTarget.dataset.value;
            const tempArr = [...selectedWeekDays, temp];
            const sortedWeekDays = tempArr.sort((a,b)=>(a - b));
            setSelectedWeekDays(sortedWeekDays);
            e.currentTarget.dataset.selected = 'true';
            // console.log("Selected Week Days: ",selectedWeekDays);
            console.log("Selected Week Days after adding curr: ", tempArr);
        }
    }
    return (
            // <div className="flex w-full lg:w-[60%] xl:w-[90%] pl-5 xl:pl-10 2xl:pl-36 items-center  bg-pink-300">
        <div className="flex w-full max-w-[600px] mx-auto px-2 items-center  ">
                {weekDays.map((item, index) => (
                    <button key={index}
                            data-value = {item.value}
                            data-selected = {item.isSelected}
                            onClick={handleWeekDaySelection}
                            className="w-[14%]  px-2  sm:w-[10%] md:w-[12%] lg:w-16 h-9  border-[1px] cursor-pointer bg-gray-700" >{item.dayName}</button>
                ))}
            </div>
    );
};

export default WeekDaysBtns;