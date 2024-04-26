
import React from "react"; 

import { NavLink, useLocation } from "react-router-dom"; 
import { Link } from "react-router-dom"; 
import { BiHome, BiLogIn } from "react-icons/bi"; 
import { PiTelevisionSimpleBold } from "react-icons/pi"; 
import { ImVideoCamera } from "react-icons/im"; 
import { SlCalender } from "react-icons/sl"; 

function MobileSidebar() {
    
    const location = useLocation();
   
    const isActive = location.pathname === "";

    return (
        <>
           
            <aside className="z-50 bg-[#BE123C]">
                <div className=" p-2 space-y-4 text-white">
                    
                    
                    <ul className=" flex flex-col justify-center items-center space-y-5">
                        
                        <NavLink
                            to="/"
                            className={`flex items-center justify-center hover:bg-white hover:text-[#BE123C] p-4 w-full gap-2 text-xl capitalize font-semibold ${isActive ? " " : ""
                                }`}
                        >
                            <BiHome className="" />
                            home
                        </NavLink>

                        
                        <NavLink
                            to="/"
                            className={`flex items-center justify-center hover:bg-white hover:text-[#BE123C] p-4 w-full gap-2 text-xl capitalize font-semibold ${isActive ? " " : ""
                                }`}
                        >
                            <ImVideoCamera className="" />
                            movies
                        </NavLink>

                        
                        <NavLink
                            to=""
                            className={`flex items-center justify-center hover:bg-white hover:text-[#BE123C] p-4 w-full gap-2 text-xl capitalize font-semibold ${isActive ? " " : ""
                                }`}
                        >
                            <PiTelevisionSimpleBold className="" />
                            tv series
                        </NavLink>

                        
                        <NavLink
                            to=""
                            className={`flex items-center justify-center hover:bg-white hover:text-[#BE123C] p-4 w-full gap-2 text-xl capitalize font-semibold ${isActive ? " " : ""
                                }`}
                        >
                            <SlCalender className="" />
                            upcoming
                        </NavLink>
                    </ul>
                    <div className=" text-white border mx-5 p-5  rounded-md bg-[transparent] space-y-2 ">
                        <p className=" font-semibold text-base ">
                            Play movie quizzes and earn free tickets
                        </p>
                        <p className=" text-xs font-semibold ">
                            50k people are playing now
                        </p>
                        <div className="flex justify-center w-full ">
                            <button className=" rounded-md px-6 py-1 bg-white text-[#BE123C]">
                                Start playing
                            </button>
                        </div>
                    </div>
                    
                    <Link
                        className="flex items-center  gap-3 justify-center pt-2 pb-5 font-semibold text-xl "
                        to=""
                    >
                        <BiLogIn className="" />
                        BiLogIn
                    </Link>
                </div>
            </aside>
        </>
    );
}


export default MobileSidebar;
