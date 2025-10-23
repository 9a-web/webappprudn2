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
    <div className="px-6 mt-4 mb-6">
      <div className="relative pb-[22px]">
        {/* Background layers with offset and darkening */}
        <div 
          className="absolute rounded-3xl w-full h-full"
          style={{ 
            backgroundColor: '#212121',
            top: '22px',
            zIndex: 1
          }}
        ></div>
        <div 
          className="absolute rounded-3xl w-full h-full"
          style={{ 
            backgroundColor: '#2C2C2C',
            top: '11px',
            zIndex: 2
          }}
        ></div>
        
        {/* Main card */}
        <div 
          className="relative rounded-3xl p-6 shadow-card overflow-hidden"
          style={{ 
            backgroundColor: '#343434',
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
