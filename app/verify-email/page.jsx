"use client"

import React, { useRef, useContext, useEffect} from 'react';
import {redirect} from "next/navigation";
import axios from "axios";
import {toast} from "react-toastify";
import {ServerAppContext} from "@/context/ClientContextProvider2.jsx";
import { FaCalendarDays } from "react-icons/fa6";


const VerifyEmail = () => {

    axios.defaults.withCredentials = true;
    // const [otp, setOtp] = useState();
    const inputRefs = useRef([]);
    const {backendUrl,getUserData,isLogged,userData} = useContext(ServerAppContext)

    const handleInput = async (e,i) =>{
        if(e.target.value.length === 1 && i < inputRefs.current.length-1){
            inputRefs.current[i + 1].focus();
        }
    }
    const handlePaste = (e)=>{
        const paste = e.clipboardData.getData('text');
        const splittedOtp  = paste.split('');
        splittedOtp.forEach((char,index)=>{
            if(char.length > 0 && index < 6){
                inputRefs.current[index].value = char;
            }
        })
    }
    const handleKeyDown = (e,i)=>{
        if(e.key === 'Backspace' && e.target.value === ''  && i > 0){
            inputRefs.current[i - 1].focus();
        }
    }
    const submitOtp = async (e) =>{
        try{
            e.preventDefault();
            const otpArray = inputRefs.current.map((currRef)=>{ // inputRefs.current gives array of referenced elements
                return currRef.value;
            })
            const otp = otpArray.join('');
            console.log("otp: ",otp);
            // const {data} = await axios.post(`${backendUrl}/api/auth/verify-account`,{otp});

            // const {data} = await axios.post(`/api/(auth)/(mwareRequired)/verify-account`,{otp});
            const {data} = await axios.post(`/api/verify-account`,{otp},{
                request:{
                    headers: {
                        credentials: 'include',
                        'Content-Type': 'application/json',
                    }
                }
            });


            console.log("Response from submitOtp: ",data);
            if(data.success){
                toast.success(data.message);
                getUserData();
            }
            else{
                toast.error(data.message);
                return;
            }
        }catch (err){
            toast.error("Error while verifying otp: ",err.message);
            return;
        }
        redirect('/');
    }

    useEffect(() => {
        isLogged && userData && userData.isAccountVerified && redirect('/');
    }, [isLogged,userData]);

    return (
        <>
            <div className="flex justify-center items-center h-screen mih-h-screen bg-slate-900">
                <FaCalendarDays onClick={()=>(redirect('/'))} className="absolute top-5 left-5 cursor-pointer w-8 sm:w-8 h-8 text-indigo-300 "  />



                <form onPaste={(e)=>handlePaste(e)} action="" className="w-full mx-2 sm:w-[70%] md:w-[50%] lg:w-[30%] py-3 rounded-md bg-transparent text-indigo-300 flex flex-col justify-center items-center gap-3">
                    <h1 className="text-4xl text-white font-semibold">Verify Email</h1>
                    <p>Enter the 6-digit otp sent to your email id.</p>
                    <div className="flex justify-between mb-5 gap-2" >
                        {/*/!*{Array.from({length: 6}, (_, i) => ())}*!/  // new method to acknowledge*/}
                        {Array(6).fill(0).map((_,i)=> (
                            <input ref={e=>inputRefs.current[i] = e}
                                   onInput={(e)=>(handleInput(e,i))}
                                   onKeyDown={(e)=>(handleKeyDown(e,i))}
                                   type="text" key={i}  maxLength={1} required className="bg-[#333A5C] h-12 text-white w-12 rounded-lg text-center"/>
                        ))}
                    </div>
                    <button onClick={(e)=>(submitOtp(e))} className="bg-gradient-to-br from-indigo-400 to-indigo-700 p-3 text-xl font-medium text-white rounded-xl px-4 cursor-pointer
                    ">Submit</button>
                </form>
            </div>
        </>
    );
};

export default VerifyEmail;