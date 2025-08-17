"use client"
import React, {createContext, useState} from 'react';

export const ClientAppContext = createContext({});

const ClientContextProvider = (props) => {

    const [freq, setFreq] = useState('daily');
    const [startDate, setStartDate] = useState(undefined);
    const [endDate, setEndDate] = useState(undefined);
    const [nextDate, setNextDate] = useState(undefined);
    const [count, setCount] = useState(undefined);
    const [selectedWeekDays, setSelectedWeekDays] = useState([]);
    // const [resultantDays, setResultantDays] = useState([]);
    // const [selectedCustomOption, setSelectedCustomOption] = useState('The first Monday of every month');
    const [selectedCustomOption, setSelectedCustomOption] = useState({weekNo:0,dayNo:1});




    const ProvidingValue ={
        freq,
        setFreq,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        nextDate,
        setNextDate,
        count,
        setCount,
        selectedWeekDays,
        setSelectedWeekDays,
        setSelectedCustomOption,
        selectedCustomOption
    }


    return (
        <>
            {/*<AppContext.Provider value={ProvidingValue}>*/}
            {/*{props.children}*/}
            {/*</AppContext.Provider>*/}
            <ClientAppContext.Provider value={ProvidingValue}>
                {props.children}
            </ClientAppContext.Provider>
        </>
    );
};

export default ClientContextProvider;