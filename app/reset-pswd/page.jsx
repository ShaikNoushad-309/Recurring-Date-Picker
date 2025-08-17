
"use client"
import React, {useState, useRef, useContext, useEffect} from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import {ServerAppContext} from "@/context/ClientContextProvider2.jsx";
import {redirect} from "next/navigation";
import { FaCalendarDays } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


const ResetPassword = () => {

    axios.defaults.withCredentials = true;
    const inputRefs = useRef([]);
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [otpSubmitted, setOtpSubmitted] = useState(false);

    const emailField = useRef();
    const passwordField = useRef();


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
    const handleEmailPaste = (e)=>{
        emailField.current.value  = e.clipboardData.getData('text');
    }
    const handlePasswordPaste = (e)=>{
        passwordField.current.value  = e.clipboardData.getData('text');
    }
    const submitEmailForm = async (e) =>{
        try{
            e.preventDefault();
            console.log("Email in Form1: ",email);

            const {data} = await axios.post(`/api/send-reset-otp`,{email},{
                request:{
                    headers: {
                        credentials: 'include',
                        'Content-Type': 'application/json',
                    }
                }
            });

            console.log("Response from submitEmailForm: ",data);
            data.success ? toast.success(data.message):toast.error(data.message);
            data.success && setEmailSubmitted(true);
        }catch (err){
            toast.error("Error while verifying email: ",err.message);
        }
    }
    const submitOtpForm = async (e) =>{
        try{
            e.preventDefault();
            const otpArray = inputRefs.current.map((item)=>{
                return item.value;
            })
            setOtp(otpArray.join(''));
            console.log("OTP in Form2: ",otpArray.join(''));
            setOtpSubmitted(true);
        }catch (err){
            toast.error("Error while verifying email: ",err.message);
        }
    }
    const submitPasswordForm = async (e) =>{
        try{
            e.preventDefault();
            console.log("Password in Form3: ",newPassword);
            // const {data} = await axios.post(`${backendUrl}/api/auth/reset-password`,{email,newPassword,otp});

            const {data} = await axios.post(`/api/reset-password`,{email,newPassword,otp},{
                request:{
                    headers: {
                        credentials: 'include',
                        'Content-Type': 'application/json',
                    }
                }
            });

            console.log("Response from submitPasswordForm: ",data);
            // if(data.success){
            //     toast.success(data.message);
            //     navigate('/login');
            // }
            // else{
            //     toast.error(data.message);
            // }
            // data.success ? toast.success(data.message):toast.error(data.message);
            // data.success && redirect('/login');
            if(data.success){
                toast.success(data.message);
            }else{
                toast.error(data.message);
                return;
            }
        }catch (err){
            toast.error("Error while verifying email: ",err.message);
            return;
        }
        redirect('/login');
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen mih-h-screen bg-slate-900">
                <FaCalendarDays onClick={()=>(redirect('/'))}  className="absolute top-5 left-5 cursor-pointer w-8 sm:w-8 h-8 text-indigo-300" />


                {/*Email form*/}
                {!emailSubmitted &&
                    <form onPaste={(e)=>handleEmailPaste(e)} action="" className="w-full mx-2 sm:w-[70%] md:w-[50%] lg:w-[30%] py-5 rounded-md bg-transparent text-indigo-300 flex flex-col justify-center items-center gap-3">
                        <h1 className="text-4xl text-white font-semibold ">Reset Password</h1>
                        <p>Enter your email id.</p>
                        <div className="flex  justify-center items-center rounded-full bg-[#333A5C] w-[80%] h-12 px-2 py-1">
                            <MdEmail className="h-5 w-5 mx-1" />
                            <input name="email" ref={emailField } onChange={(e)=>(setEmail(e.target.value))} required={true} value={email} className="h-full bg-transparent w-[80%] rounded-full outline-none p-2  " placeholder="Email id" type="email"/>
                        </div>
                        <button onClick={(e)=>(submitEmailForm(e))} className="bg-gradient-to-r from-indigo-400 to-indigo-700 text-xl text-white w-[80%] rounded-full p-2.5  font-medium  px-4 cursor-pointer">Submit</button>
                    </form> }

                {/*OTP Form*/}
                {emailSubmitted && !otpSubmitted &&
                    <form onPaste={(e)=>handlePaste(e)} action="" className="w-full mx-2 sm:w-[70%] md:w-[50%] lg:w-[30%] py-3 rounded-md bg-transparent text-indigo-300 flex flex-col justify-center items-center gap-3">
                        <h1 className="text-3xl font-semibold">Reset Password OTP</h1>
                        <p>Enter the 6-digit otp sent to your email id.</p>
                        <div className="flex justify-between mb-5 gap-2" >
                            {Array(6).fill(0).map((_,i)=> (
                                <input ref={e=>inputRefs.current[i] = e}
                                       onInput={(e)=>(handleInput(e,i))}
                                       onKeyDown={(e)=>(handleKeyDown(e,i))}
                                       type="text" key={i}  maxLength={1} required className="bg-[#333A5C] h-12 text-white w-12 rounded-lg text-center"/>
                            ))}
                        </div>
                        <button onClick={(e)=>(submitOtpForm(e))} className="bg-gradient-to-br from-indigo-400 to-indigo-700 p-3 text-lg font-semibold rounded-md px-4">Submit</button>
                    </form> }

                {/*Password Form*/}
                {emailSubmitted && otpSubmitted &&
                    <form onPaste={(e)=>handlePasswordPaste(e)} action="" className="w-full mx-2 sm:w-[70%] md:w-[50%] lg:w-[30%] py-5 rounded-md bg-transparent text-indigo-300 flex flex-col justify-center items-center gap-3">
                        <h1 className="text-3xl font-semibold">New Password</h1>
                        <p>Enter new password</p>
                        <div className="flex  justify-center items-center rounded-full bg-[#333A5C] w-[80%] h-12 px-1 py-1">
                            <FaLock className="h-4 w-4 mx-1" />
                            <input name="password" onChange={(e)=>(setNewPassword(e.target.value))} required={true} value={newPassword} className="h-full bg-transparent w-[80%] rounded-full outline-none p-2  " placeholder="password" type="password"/>
                        </div>
                        <button onClick={(e)=>(submitPasswordForm(e))} className="bg-gradient-to-br from-indigo-500 w-[80%] rounded-full to-indigo-800 p-2.5 text-lg font-semibold cursor-pointer px-4">Submit</button>
                    </form> }
            </div>
        </>
    );
};

export default ResetPassword;