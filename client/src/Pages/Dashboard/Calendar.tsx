
import  { useState } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (date:any) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const startOfMonth = (date:any) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const renderCalendar = () => {
    const numDays = daysInMonth(currentDate);
    const startDay = startOfMonth(currentDate);
    const today = new Date().getDate(); // Get the current day of the month
    const currentMonth = new Date().getMonth(); // Get the current month

    const blanks = [];
    for (let i = 0; i < startDay; i++) {
      blanks.push(
        <div key={`blank-${i}`} className="border border-transparent h-12"></div>
      );
    }

    const days = [];
    for (let d = 1; d <= numDays; d++) {
      const isCurrentDay = d === today && currentDate.getMonth() === currentMonth; // Check if the day is today
      const dayClassName = `border border-gray-300 h-12 flex justify-center items-center ${isCurrentDay ? 'bg-blue-700 text-white' : ''}`;
      days.push(
        <div key={d} className={dayClassName}>
          {d}
        </div>
      );
    }

    return [...blanks, ...days];
  };

  return (
    <div className="p-4 bg-white h-[550px] w-[400px] my-2 shadow-lg m-4 hover:shadow-xl rounded">
      <div className="flex justify-between items-center mb-4">
        <IconButton onClick={prevMonth} className="text-gray-500 hover:text-gray-700">
          <ChevronLeft />
        </IconButton>
        <div>
          <Typography variant="h5" className="text-lg font-semibold text-gray-700">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </Typography>
        </div>
        <IconButton onClick={nextMonth} className="text-gray-500 hover:text-gray-700">
          <ChevronRight />
        </IconButton>
      </div>
      <div className="grid grid-cols-7 gap-1">
        <div className="text-center font-semibold text-gray-700">Sun</div>
        <div className="text-center font-semibold text-gray-700">Mon</div>
        <div className="text-center font-semibold text-gray-700">Tue</div>
        <div className="text-center font-semibold text-gray-700">Wed</div>
        <div className="text-center font-semibold text-gray-700">Thu</div>
        <div className="text-center font-semibold text-gray-700">Fri</div>
        <div className="text-center font-semibold text-gray-700">Sat</div>
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
