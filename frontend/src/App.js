import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { Header } from './components/Header';
import { LiveScheduleCard } from './components/LiveScheduleCard';
import { CalendarModal } from './components/CalendarModal';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentClass, setCurrentClass] = useState('История России');
  const [minutesLeft, setMinutesLeft] = useState(47);

  // Test backend connection
  useEffect(() => {
    const helloWorldApi = async () => {
      try {
        const response = await axios.get(`${API}/`);
        console.log('Backend response:', response.data.message);
      } catch (e) {
        console.error('Backend connection error:', e);
      }
    };

    helloWorldApi();
  }, []);

  // Mock schedule data - will be replaced with real parsing
  const mockSchedule = [
    { name: 'История России', start: '09:00', end: '10:30' },
    { name: 'Высшая математика', start: '10:45', end: '12:15' },
    { name: 'Физическая культура', start: '12:30', end: '14:00' },
    { name: 'Иностранный язык', start: '14:15', end: '15:45' },
  ];

  // Update current class and time left based on real time
  useEffect(() => {
    const updateCurrentClass = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      for (const classItem of mockSchedule) {
        const [startHour, startMin] = classItem.start.split(':').map(Number);
        const [endHour, endMin] = classItem.end.split(':').map(Number);
        const startTime = startHour * 60 + startMin;
        const endTime = endHour * 60 + endMin;

        if (currentTime >= startTime && currentTime < endTime) {
          setCurrentClass(classItem.name);
          setMinutesLeft(endTime - currentTime);
          return;
        }
      }

      // No class currently
      setCurrentClass('Занятий нет');
      setMinutesLeft(0);
    };

    updateCurrentClass();
    const interval = setInterval(updateCurrentClass, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleCalendarClick = () => {
    setIsCalendarOpen(true);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    console.log('Selected date:', date);
    // Here you would fetch schedule for the selected date
  };

  return (
    <div className="min-h-screen bg-background telegram-webapp">
      <Header onCalendarClick={handleCalendarClick} />
      <LiveScheduleCard currentClass={currentClass} minutesLeft={minutesLeft} />
      
      {/* Calendar Modal */}
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onDateSelect={handleDateSelect}
      />

      {/* Placeholder for future schedule list */}
      <div className="px-6 mt-8">
        <h3 className="text-base font-semibold text-foreground mb-4">
          Расписание на {selectedDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
        </h3>
        <div className="space-y-3">
          {mockSchedule.map((classItem, index) => (
            <div key={index} className="bg-card rounded-2xl p-4 shadow-card hover:shadow-glow transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-card-foreground">{classItem.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {classItem.start} - {classItem.end}
                  </p>
                </div>
                <div className="w-2 h-2 rounded-full bg-gradient-live"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
