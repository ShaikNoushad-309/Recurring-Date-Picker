
"use client"

import {createContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";

export const ServerAppContext = createContext({});

export const AppContextProvider = (props) =>{   // method to provide createdContext.Provider by simply wrapping child ele's
                                                // const backendUrl = process.env.BACKEND_URL; // also can de done below
                                                // const backendUrl = import.meta.env.BACKEND_URL;

    // const backendUrl = "http://localhost:3001";


    axios.defaults.withCredentials = true;

    const [isLogged, setIsLogged] = useState(false);
    const [userData, setUserData] = useState();
    const [resultantDays, setResultantDays] = useState([]);
    const [isInitialised, setIsInitialised] = useState(false);

    const getUserData = async () =>{
        try{
            // const {data} = await axios.get(`${backendUrl}/api/user/data`);

            // const {data} = await axios.get(`/api/(user)/getdata`);
            const {data} = await axios.get(`/api/getdata`,{
                credentials: 'include',
            });

            console.log("Response from getUserData: ",data);
            const {currUserData} = data;
            console.log("Data from Response from getUserData: ",currUserData);
            data.success ? setUserData(currUserData) : toast.error("Error while fetching user data");

            // another try in order to make data variable received from axios response block scoped
            // try{
            // const {data} = await axios.get(`/api/getdates`,{
            //     credentials: 'include',
            //     'Content-Type': 'application/json'
            // });
            // console.log("Response from getdates: ",data);
            // const {rawDates} =  data;
            // console.log("Raw dates from getdates: ",rawDates);
            // if(data.success) {
            //     const {dates} = rawDates;
            //     console.log("dates from getdates: ",dates);
            //     setResultantDays(dates);
            // }else{
            //     console.log("Error while fetching dates from getdates: ");
            //     toast.error("Error while fetching dates from getdates: ");
            // }
            // }catch(err){
            //     console.log("Got error at getdates in ClientContextProvider2.jsx",err.message);
            //     toast.error("Error while fetching dates from getdates: ",err.message);
            // }
            // return response.userData;

        }catch (err){
            console.log("Got error at getUserData in ClientContextProvider2.jsx",err.message);
            // toast.error("Error while fetching user data: ",err.message);
        }
    }

    const getUserDates = async () =>{
            // another try in order to make data variable received from axios response block scoped
            try{
                const {data} = await axios.get(`/api/getdates`,{
                    credentials: 'include',
                    'Content-Type': 'application/json'
                });
                console.log("Response from getdates: ",data);
                const {rawDates} =  data;
                console.log("Raw dates from getdates: ",rawDates);
                if(data.success) {
                    const {dates} = rawDates;
                    console.log("dates from getdates: ",dates);
                    setResultantDays(dates);
                }else{
                    console.log("Error while fetching dates from getdates: ");
                    // toast.error("Error while fetching dates from getdates: ");
                }
                setIsInitialised(true);
            }catch(err){
                console.log("Got error at getdates in ClientContextProvider2.jsx",err.message);
                // toast.error("Error while fetching dates from getdates: ",err.message);
                setIsInitialised(true);
            }
    }

    const getAuthState = async () =>{
        try{
            // const {data} = await axios.get(`${backendUrl}/api/auth/is-auth`);

            // const {data} = await axios.get(`/api/(auth)/(mwareRequired)/is-auth`);
            const {data} = await axios.get(`/api/is-auth`);


            console.log("Response from is-(auth) route from backend: ",data);
            if(data.success){
                setIsLogged(true);
                getUserData();
            }
            // return response.userData;
        }catch (err){
            console.log("Got error at getAuthState in ClientContextProvider2.jsx",err.message);
            toast.error("No user authenticated yet ",err.message);
        }
    }

    useEffect(() => {
        getAuthState();
        getUserDates();
    }, []);
    // useEffect(() => {
    //     getUserDates();
    // }, []);

    const value = {
        isLogged,
        setIsLogged,
        userData,
        setUserData,
        resultantDays,
        setResultantDays,
        isInitialised,
        setIsInitialised,
        getUserData // stores curr user's data in userData  state
    }

    return (
        // <AppContext.Provider value={value}>
        //     {props.children}
        // </AppContext.Provider>

        <ServerAppContext.Provider value={value}>
            {props.children}
        </ServerAppContext.Provider>
    )
}

