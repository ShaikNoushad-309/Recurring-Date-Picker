"use client"

import React from 'react';

const Navbar = () => {
    return (
        <>
            <nav className="flex w-full h-20  ">
                <div className="w-full md:w-[70%] mx-5 md:mx-auto h-full flex justify-between items-center">
                <h1 className="font-mono text-[1.1em] sm:text-xl md:text-4xl font-bold text-center flex items-center gap-2">
                    <img src="https://tse4.mm.bing.net/th/id/OIP.-5KxeBsY7Nec33d570qrDAHaHa?pid=Api&P=0&h=180" className="w-9 h-9 rounded-full" alt="calendar"/>
                    Recurring Date Picker</h1>
                <button className="group text-lg sm:text-md  flex text-white px-5 py-2 items-center gap-3 border-2 border-gray-500 rounded-full cursor-pointer hover:bg-black hover:text-white">Login</button>
                </div>
            </nav>
        </>
    );
};

export default Navbar;