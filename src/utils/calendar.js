import dayjs from "dayjs";

export const generateDate = (
  month = dayjs().month(),
  year = dayjs().year(),
  data
) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

  const arrayOfDate = [];

  
  const dateMapping = {};

  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    const date = firstDateOfMonth.day(i);

    arrayOfDate.push({
      currentMonth: false,
      date,
    });
  }

  for(let i = 0; i < data.length; i++){
	dateMapping[data[i].date] = data[i].count;
  }

  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    const date = firstDateOfMonth.date(i);
    const dateKey = date.toDate().toDateString(); // Adjust this to your data structure
    const dayClass = dateMapping[dateKey] == 1 ? "bg-[#055100]" : 
					 dateMapping[dateKey] == 2 ? "bg-[#087500]" :
					 dateMapping[dateKey] >= 3 ? "bg-[#0A9800]" :
					"bg-[#313131]";
	
	// console.log(dayClass + dateMapping[dateKey] + dateKey);

    arrayOfDate.push({
      currentMonth: true,
      date,
      today: date.toDate().toDateString() === dayjs().toDate().toDateString(),
      dayClass,
    });
  }

  const remaining = 42 - arrayOfDate.length;

  for (let i = lastDateOfMonth.date() + 1; i <= lastDateOfMonth.date() + remaining; i++) {
    const date = lastDateOfMonth.date(i);

    arrayOfDate.push({
      currentMonth: false,
      date,
    });
  }

  return arrayOfDate;
};


export const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
]
