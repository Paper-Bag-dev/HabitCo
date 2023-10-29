import React, { useContext, useEffect, useState } from 'react'
import Calendar from './calendar'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { Context, server } from '../main';
import axios from 'axios';

const CalendarComponent = () => {

  const [curr, setCurr] = useState(0);
  const { setIsAuthenticated, setLoading, setUser} = useContext(Context);
  return (
    <>
      <div onClick={() => setCurr(curr-1)} className="group max-h-full w-20 flex items-center transition-all hover:cursor-pointer hover:bg-white/10">
        <SlArrowLeft className=" text-white/10 group-hover:text-white/80 transition-all" size={40} />
      </div>
      <div className="flex flex-wrap  px-2 max-w-full max-h-full flex-grow ">
        <Calendar month={curr} />
        <Calendar month={curr + 1} />
        <Calendar month={curr + 2} />
        <Calendar month={curr + 3} />
      </div>
      <div onClick={() => setCurr(curr+1)} className="group max-h-full w-20 flex items-center transition-all hover:cursor-pointer hover:bg-white/10">
        <SlArrowRight className="text-white/10 group-hover:text-white/80 transition-all" size={40} />
      </div>
    </>
  )
}

export default CalendarComponent