import React from 'react';
import { Calendar } from 'lucide-react';

export const Header = ({ onCalendarClick }) => {
  return (
    <header className="px-6 py-5 flex items-center justify-between">
      {/* Left side - Logo and text */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* RUDN Logo */}
            <rect width="40" height="40" rx="8" fill="#E7E7E7" fillOpacity="0.1"/>
            <path d="M12 12h6c3.314 0 6 2.686 6 6s-2.686 6-6 6h-6V12z" fill="#E7E7E7"/>
            <path d="M20 18c0-1.657-1.343-3-3-3h-2v6h2c1.657 0 3-1.343 3-3z" fill="#1C1C1E"/>
            <circle cx="20" cy="18" r="2" fill="#E7E7E7"/>
            <rect x="26" y="12" width="2" height="12" fill="#E7E7E7"/>
            <rect x="10" y="26" width="18" height="2" fill="#E7E7E7"/>
          </svg>
        </div>
        <h1 className="text-sm font-bold tracking-tight" style={{ color: '#E7E7E7' }}>
          Rudn Schedule
        </h1>
      </div>

      {/* Right side - Calendar icon */}
      <button
        onClick={onCalendarClick}
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent/50 hover:bg-accent transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Open calendar"
      >
        <Calendar className="w-5 h-5" style={{ color: '#E7E7E7' }} />
      </button>
    </header>
  );
};
