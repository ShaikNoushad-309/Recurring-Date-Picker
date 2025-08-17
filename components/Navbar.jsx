// "use client"
//
// import {redirect} from "next/navigation";
// import React from 'react';
//
// const Navbar = () => {
//     return (
//         <>
//             <nav className="flex w-full h-20  ">
//                 <div className="w-full md:w-[70%] mx-5 md:mx-auto h-full flex justify-between items-center">
//                 <h1 className="font-mono text-[1.1em] sm:text-xl md:text-4xl font-bold text-center flex items-center gap-2">
//                     <img src="https://tse4.mm.bing.net/th/id/OIP.-5KxeBsY7Nec33d570qrDAHaHa?pid=Api&P=0&h=180" className="w-9 h-9 rounded-full" alt="calendar"/>
//                     Recurring Date Picker</h1>
//                 <button
//                     onClick={()=>redirect('/login')}
//                     className="group text-lg sm:text-md  flex text-white px-5 py-2 items-center gap-3 border-2 border-gray-500 rounded-full cursor-pointer hover:bg-black hover:text-white">Login</button>
//                 </div>
//             </nav>
//
//
//         </>
//     );
// };
//
// export default Navbar;

"use client"
import React, {useContext, useState} from 'react';
import { FaCalendarDays } from "react-icons/fa6";

import {redirect} from "next/navigation";
import {ServerAppContext} from "@/context/ClientContextProvider2.jsx";
import axios from "axios";
import {toast} from "react-toastify";

const Navbar = () => {

    const {userData,resultantDays,setResultantDays,setUserData,setIsLogged} = useContext(ServerAppContext)
    console.log("userData in Navbar: ",userData);
    const logOut = async () =>{
        try{
            axios.defaults.withCredentials = true;
            // const {data} = await axios.post(`${backendUrl}/api/auth/logout`,userData.email);

            const {data} = await axios.post(`/api/logout`,userData.email);

            console.log("Response from logOut: ",data);
            if(data.success){
                setIsLogged(false);
                setUserData(false);
                // navigate('/');
                console.log('logged out successfully');
            }
            else{
                toast.error(data.message);
                return;
            }
        }catch (err){
            toast.error("Error while logging out: ",err.message);
            console.log("Got error while logging out: ",err.message);
            return;
        }
        setResultantDays([]);
        redirect('/');
    }
    const sendVerificationOtp = async () =>{
        try{
            axios.defaults.withCredentials = true;
            // const {data} = await axios.post(`${backendUrl}/api/auth/send-verify-otp`,userData.email);

            // const {data} = await axios.post(`/api/(auth)/(mwareRequired)/send-verify-otp`,userData.email);
            const {data} = await axios.post(`/api/send-verify-otp`,userData.email);


            console.log("Response from sendVerificationOtp: ",data);
            if(data.success){
                // navigate('/verify-email');
                toast.success(data.message);
            }
            else{
                toast.error(data.message);
                return;
            }
        }catch (err){
            toast.error("Error while sending verification otp in Navbar: ",err.message);
            console.log("Error while sending verification otp: ",err.message);
            return;
        }
        redirect('/verify-email');
    }
    return (
        <>
            <nav className="flex w-full h-20  ">
                <div className="w-full md:w-[70%] mx-5 md:mx-auto h-full flex justify-between items-center">
                    <h1 className="font-mono text-[1.1em] sm:text-xl md:text-4xl text-indigo-200 font-bold text-center flex items-center gap-2">
                        {/*<img src="https://tse4.mm.bing.net/th/id/OIP.-5KxeBsY7Nec33d570qrDAHaHa?pid=Api&P=0&h=180" className="w-9 h-9 rounded-full" alt="calendar"/>*/}
                        <FaCalendarDays className="" />
                        Recurring Date Picker</h1>
                    {userData?<div className="group w-10 rounded-full text-white flex relative cursor-pointer justify-center items-center text-lg h-10 bg-slate-500">{userData.name[0].toUpperCase()}
                        <ul className="absolute hidden group-hover:flex flex-col  items-center text-xl bg-zinc-200   top-full w-32   rounded-lg  text-black">
                            {!userData.isAccountVerified && <li onClick={sendVerificationOtp} className="item2 w-full py-2 px-2 h-[50%] hover:bg-zinc-400 rounded-md">Verify email</li>}
                            <li onClick={logOut} className="item3 w-full py-2 px-2 h-[50%] hover:bg-zinc-400 rounded-md">Logout</li>
                        </ul>
                    </div> : (
                        <button
                            onClick={()=>redirect('/login')}
                            className="group text-lg sm:text-md  flex text-white px-5 py-2 items-center gap-1 border-2 border-gray-500 rounded-full cursor-pointer hover:bg-black hover:text-white">Login
                        </button>
                    )}

                </div>
            </nav>
        </>
    );
};

export default Navbar;