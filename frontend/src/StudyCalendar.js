import {useState} from 'react';
import './StudyCalendar.css';

function StudyCalendar(props) {
    const allStudyDates = props.courses.flatMap(course=>course.studyDates);
    const uniqueDates = [...new Set(allStudyDates)];


    const today=new Date();
    const year=today.getFullYear();
    const month= today.getMonth();

    const [currentMonth, setCurrentMonth]= useState(month);
    const [currentYear, setCurrentYear]= useState(year);

    const monthName=new Date(currentYear, currentMonth).toLocaleString('default', {month:'long'});

    const daysInMonth=new Date(currentYear,currentMonth+1,0).getDate();
    const firstDayOfMonth=new Date(currentYear,currentMonth,1).getDay();
    const days = [...Array(firstDayOfMonth).fill(null), ...[...Array(daysInMonth).keys()].map(d => d + 1)];

    console.log("Days in month:", daysInMonth);
    console.log("First day:", firstDayOfMonth);

    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    function isStudied(day){
      return uniqueDates.some(dateStr=>
        new Date(dateStr).getDate()===day &&
        new Date(dateStr).getMonth()=== currentMonth
      );
    }

    function goToPreviousMonth() {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }

    function goToNextMonth() {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="nav-btn" onClick={goToPreviousMonth}>{"❮"}</button>
        <h2>📅 {monthName} {currentYear}</h2>
        <button className="nav-btn" onClick={goToNextMonth}>{"❯"}</button>
      </div>
      <div className="calendar-grid">
        {dayLabels.map(label => (
          <span key={label} className="day-label">{label}</span>
        ))}
        {days.map((day, index) => (
          <span key={index} className="day-cell">
            {day === null ? "" : isStudied(day) ? "🔥" : day}
          </span>
        ))}
      </div>
    </div>
  );
}

export default StudyCalendar;