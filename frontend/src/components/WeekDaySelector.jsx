import React, { useState, useEffect } from 'react';

export const WeekDaySelector = ({ selectedDate, onDateSelect }) => {
  const [weekDays, setWeekDays] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0); // Default to today (first button)

  useEffect(() => {
    generateWeekDays();
  }, []);

  const generateWeekDays = () => {
    const today = new Date();
    const days = [];
    
    // Generate 6 days: today and next 5 days
    for (let i = 0; i < 6; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date: date.getDate(),
        dayName: getDayName(date.getDay()),
        fullDate: date,
        isToday: i === 0
      });
    }
    
    setWeekDays(days);
  };

  const getDayName = (dayIndex) => {
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    return days[dayIndex];
  };

  const handleDayClick = (index, day) => {
    setSelectedIndex(index);
    if (onDateSelect) {
      onDateSelect(day.fullDate);
    }
  };

  return (
    <div className="px-6">
      <div className="flex gap-3 justify-center overflow-x-auto scrollbar-hide pb-2">
        {weekDays.map((day, index) => {
          const isSelected = index === selectedIndex;
          
          return (
            <button
              key={index}
              onClick={() => handleDayClick(index, day)}
              className={`
                flex-shrink-0 rounded-[40px] flex flex-col items-center justify-center
                transition-all duration-300 hover:scale-105 active:scale-95
                ${
                  isSelected
                    ? 'bg-gradient-live shadow-glow'
                    : 'bg-[#2C2C2C] hover:bg-[#353535]'
                }
              `}
              style={{ width: '61px', height: '99px' }}
            >
              {/* Date */}
              <span
                className="font-zaglav font-normal leading-none mb-0.5"
                style={{
                  fontSize: '40px',
                  color: isSelected ? '#F9F9F9' : '#BEBEBE',
                  fontWeight: 400
                }}
              >
                {String(day.date).padStart(2, '0')}
              </span>
              
              {/* Day of week */}
              <span
                className="font-zaglav font-normal leading-none"
                style={{
                  fontSize: '24px',
                  color: '#999999',
                  fontWeight: 400
                }}
              >
                {day.dayName}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
