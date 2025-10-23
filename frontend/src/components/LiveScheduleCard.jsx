import React, { useState, useEffect } from 'react';

export const LiveScheduleCard = ({ currentClass, minutesLeft }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div className="mt-4 mb-[20px] flex justify-center">
      <div className="relative" style={{ width: '373px', paddingBottom: '49px' }}>
        {/* 3rd layer - самая маленькая и дальняя */}
        <div 
          className="absolute rounded-3xl mx-auto left-0 right-0"
          style={{ 
            backgroundColor: '#212121',
            width: '311px',
            height: '140px',
            top: '49px',
            zIndex: 1
          }}
        ></div>
        {/* 2nd layer - средняя */}
        <div 
          className="absolute rounded-3xl mx-auto left-0 right-0"
          style={{ 
            backgroundColor: '#2C2C2C',
            width: '347px',
            height: '156px',
            top: '22px',
            zIndex: 2
          }}
        ></div>
        
        {/* Main card - 1-я карточка (самая большая) */}
        <div 
          className="relative rounded-3xl p-6 shadow-card overflow-hidden"
          style={{ 
            backgroundColor: '#343434',
            width: '373px',
            height: '167px',
            zIndex: 3
          }}
        >
          {/* Subtle background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-50"></div>
          
          <div className="relative flex items-center justify-between">
            {/* Left side - Text content */}
            <div className="flex-1">
              <h2 className="text-sm font-bold mb-2" style={{ color: '#FFFFFF' }}>
                Сейчас идёт: {currentClass}
              </h2>
              <p className="text-sm font-medium" style={{ color: '#999999' }}>
                Осталось: {minutesLeft} минут
              </p>
            </div>

            {/* Right side - Gradient circle with time */}
            <div className="relative flex items-center justify-center">
              {/* Gradient circle border */}
              <div className="absolute w-24 h-24 rounded-full bg-gradient-live animate-pulse-glow" style={{ filter: 'blur(8px)', opacity: 0.6 }}></div>
              
              {/* Main circle */}
              <div className="relative w-24 h-24 rounded-full p-[3px] bg-gradient-live">
                <div className="w-full h-full rounded-full" style={{ backgroundColor: '#343434' }}>
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-xl font-bold" style={{ color: '#FFFFFF' }}>
                      {formatTime(time)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
