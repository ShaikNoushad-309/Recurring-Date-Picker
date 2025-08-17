"use client"

import React from 'react';
import {useState,useContext} from "react";
import {useForm} from "react-hook-form";
import {ServerAppContext} from "@/context/ClientContextProvider2.jsx";
import axios from "axios";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import {redirect, RedirectType,useRouter} from "next/navigation";
import { FaCalendarDays } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Login = () => {
    const [state, setState] = useState('Sign Up');
    const initialState = {name:'',email:'',password:''}
    const [form, setForm] = useState(initialState);
    const {setIsLogged,
        getUserData,
    } = useContext(ServerAppContext);
    const router = useRouter();
    // console.log("Backend url: ",backendUrl);
    // console.log('')

    const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value});
        console.log(form);
    }
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = async (data) => {
        // console.log(form);
        console.log(data);

            //     const newData = {...data,userId:''};
            // const updatedForm = {...form,...newData};

            // const newData = {...data,userId:''};
            const updatedForm = {...form,...data};
            setForm(updatedForm);
            console.log("Updated form: ",updatedForm);
            // setForm({name:data.name,email:data.email,password:data.password});
            //  e.preventDefault();
            axios.defaults.withCredentials = true;
        try{

            if(state === 'Sign Up'){
                // console.log("Form state :",form);


                // const {data} = await axios.post(`${backendUrl}/api/auth/register`,updatedForm);
                console.log("State is Sign Up:",state);
                console.log("Updated form: ",updatedForm);
                // const {data} = await axios.post(`/api/register`,updatedForm,{
                //     headers:{
                //         "Content-Type": "application/json",
                //     }
                // });
                const {data} = await axios.post('/api/register', updatedForm, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                // const {data} = await rawData;
                // const {data} = await axios.post("http://localhost:3000"+"/api/(auth)/register",{updatedForm});
                // const rawData = await fetch({method:'POST',url:`${backendUrl}/api/(auth)/register`,headers:{'Content-Type':'application/json'},body:JSON.stringify(updatedForm)});
                // console.log("raw data: ",rawData);
                console.log("data from backend: ", data);
                if(data.success){
                    console.log("Success from backend in login client page: ",data.message);
                    setIsLogged(true);
                    getUserData();
                    // navigate('/');


                    console.log('data submitted with signUp form');
                    // toast.success('Registration successful', {
                    //     position: "top-right",
                    //     autoClose: 5000,
                    //     hideProgressBar: false,
                    //     closeOnClick: false,
                    //     pauseOnHover: true,
                    //     draggable: true,
                    //     progress: undefined,
                    // })
                    // redirect('/',RedirectType.replace);
                }
                else{
                    toast.error('Error from backend : '+data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                    console.log("Error from backend : ",data.message);
                    setForm(initialState);
                    return;
                }
            }
            else{
                // const {data} = await axios.post(`${backendUrl}/api/(auth)/login`,{email:form.email,password:form.password});


                // const {data} = await axios.post(`${backendUrl}/api/auth/login`,{email:updatedForm.email,password:updatedForm.password});

                const {data} = await axios.post(`/api/login`,{email:updatedForm.email,password:updatedForm.password},{
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if(data.success){
                    setIsLogged(true);
                    getUserData();
                    // navigate('/');
                    console.log('data submitted with login form');
                    // toast.success('Login successful', {
                    //     position: "top-right",
                    //     autoClose: 5000,
                    //     hideProgressBar: false,
                    //     closeOnClick: false,
                    //     pauseOnHover: true,
                    //     draggable: true,
                    //     progress: undefined,
                    // })
                    // redirect('/',RedirectType.replace);
                    setForm(initialState);
                }
                else{
                    toast.error('Error from backend : '+data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                    console.log("Error from backend : ",data.message);
                    setForm(initialState);
                     return;
                }
            }
        }catch (err){
            console.log("Got error while submitting data to backend: ",err.message);
            return;
        }
        redirect('/',RedirectType.replace);

    }
    return (
        // <div className="flex justify-center items-center h-screen mih-h-screen bg-gradient-to-b from-blue-200 to-purple-400">
        <div className="flex justify-center items-center h-screen mih-h-screen bg-slate-900">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                // transition={Bounce}
            />
            <FaCalendarDays onClick={()=>(redirect('/'))} className="absolute top-5 left-5 cursor-pointer w-8 sm:w-8 h-8 text-indigo-300"  />


            <div className="py-5 px-5 w-[80%] sm:w-[65%] md:w-[40%] lg:w-[30%] rounded-md bg-slate-900 text-indigo-300 flex flex-col justify-center items-center gap-3">
                <h2 className="text-4xl text-white font-semibold">{state === 'Sign Up'?'Create account':'Login'}</h2>
                <p className="text-lg">{state === 'Sign Up'?'Create your account':'Log into your account'}</p>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col justify-center items-center  gap-2" action="">
                    {isSubmitting && <p>Submitting...</p>}
                    {state === 'Sign Up' && ( <div className="flex  justify-center items-center rounded-full bg-[#333A5C] w-full h-12 px-2 py-1">
                        {/*<img src={assets.person_icon} className="h-5 w-5 mx-1" alt="person"/>*/}
                        <IoPersonSharp className="h-5 w-5 mx-1" />
                        <input name="name"   className="h-full bg-transparent w-full rounded-full outline-none p-2  " placeholder="Full name" type="text"
                               {...register('name',{required:{value:true,message:"Please enter your name"},
                                   minLength:{value:3,message:"Name must be at least 3 characters long"}})}/>
                    </div>)}
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    <div className="flex  justify-center items-center rounded-full bg-[#333A5C] w-full h-12 px-2 py-1">
                        {/*<img src={assets.mail_icon} className="h-5 w-5 mx-1" alt="mail"/>*/}
                        <MdEmail className="h-5 w-5 mx-1" />
                        <input name="email"  className="h-full bg-transparent w-full rounded-full outline-none p-2  " placeholder="Email id" type="email"
                               {...register('email',{required:{value:true,message:"Please enter your email"},
                                   minLength:{value:3,message:"Email must be at least 3 characters long"}})}/>
                    </div>
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                    <div className="flex  justify-center items-center rounded-full bg-[#333A5C] w-full h-12 px-2 py-1">
                        {/*<img src={assets.lock_icon} className="h-5 w-5 mx-1" alt="lock"/>*/}
                        <FaLock className="h-4 w-4 mx-1" />
                        <input name="password"  className="h-full bg-transparent w-full rounded-full outline-none p-2  " placeholder="Password" type="password"
                               {...register('password',{required:{value:true,message:"Please enter a password"},
                                   minLength:{value:3,message:"Password must be atleast 3 characters long"}})}/>
                    </div>
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    <div className="flex w-full ml-3 justify-start">
                        {/*<p className="text-blue-700 cursor-pointer" onClick={()=>(navigate('/reset-pswd'))}>forgot password?</p>*/}

                        {/*<p className="text-blue-700 cursor-pointer" onClick={()=>(redirect('/reset-pswd'))}>forgot password?</p>*/}
                        <p className="text-blue-700 cursor-pointer" onClick={()=>router.push('/reset-pswd')}>forgot password?</p>


                    </div>
                    <button className="text-xl text-white w-full rounded-full  font-medium py-2.5 bg-gradient-to-r from-indigo-400 to-indigo-700 cursor-pointer">{state}</button>
                    <p>{state === 'Sign Up'?'Already have an account?':"Don't have an account?"}&nbsp;&nbsp;
                        <span onClick={()=>{setState(state === 'Sign Up'?'Login':'Sign Up')}}
                              className="text-blue-500 underline text-md cursor-pointer">{state === 'Sign Up'?'login here':"register"}</span> </p>
                </form>
            </div>
        </div>
    );
};

export default Login;