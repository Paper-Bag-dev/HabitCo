import { useContext, useEffect, useState } from 'react';
import { generateDate, months } from '../utils/calendar'
import { Context, server } from "../main";
import cn from '../utils/cn'
import dayjs from 'dayjs';
import axios from 'axios';

const Calendar = ({month}) => {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const currentDay = dayjs().add(month, "M");
  const {refresh, setRefresh} = useContext(Context);
  const [data, setData] = useState({});

  useEffect( () => {
    try {
      axios.get(`${server}/calendar/getCalendarData`, {
        withCredentials: true,
      }).then((res) => {
        setData(res.data.counterData); 
      });
    } catch (error) {
      console.log(error);
    }
  }, [refresh]);
  

  return (
    <div className="flex w-1/2 mx-auto place-content-center items-center">
      {/* Month Header */}
      
      <div className="w-[500px] h-[365px] bg-[#222222] rounded-2xl">

        <div className="flex justify-between p-2 px-6">
          <div className=" font-light text-slate-100/70 text-3xl">
            <h1>{ months[currentDay.month()] }</h1>
          </div>

          <div className=" text-slate-100/70 text-2xl">
          {currentDay.year()}
          </div>
        </div>

        {/* Days */}

        <div className=" w-full px-4 grid grid-cols-7 text-gray-400 text-lg text-center">
          {days.map((days, index) => {
            return <h1 key={index}>{days}</h1>
          })}
        </div> 
        
        {/* Days current month */}

        <div className=" w-full px-4 grid grid-cols-7">
          {generateDate(currentDay.month() + month, currentDay.year(), data).map(({ date, currentMonth, today, dayClass }, index) => {
            return (
              <div className=" h-[46px] grid place-content-center text-sm" key={index}>
                <h1 className={cn(currentMonth ? "" : " text-gray-500 bg-[#272727]", today ? " text-[#FCF9F9]" : "",
                  "h-10 w-10 grid place-content-center rounded-full transition-all ", `${dayClass}` )}>{date.date()}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Calendar