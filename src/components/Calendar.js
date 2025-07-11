import React, { useState, useEffect } from 'react';
import AppointmentForm from './AppointmentForm';

const Calendar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState(
    JSON.parse(localStorage.getItem('appointments')) || {}
  );

  // Update screen mode on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const saveAppointment = (appointment) => {
    const date = appointment.date;
    const updated = { ...appointments };
    if (!updated[date]) updated[date] = [];
    updated[date].push(appointment);
    setAppointments(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
    setSelectedDate(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Appointment Calendar</h2>

      {isMobile ? (
        <div>
          <input
            type="date"
            className="mb-4 border p-2 rounded"
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          {selectedDate && (
            <div className="border p-4 rounded shadow mb-4">
              <p className="font-semibold mb-2">{selectedDate}</p>
              {(appointments[selectedDate] || []).map((appt, i) => (
                <div key={i} className="text-sm mb-1">
                  {appt.time} – {appt.patient} with {appt.doctor}
                </div>
              ))}
              <button
                onClick={() => setSelectedDate(selectedDate)}
                className="mt-2 text-blue-600 underline"
              >
                Add Appointment
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-2">
          {[...Array(daysInMonth)].map((_, i) => {
            const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
            return (
              <div
                key={i}
                className="border p-2 rounded h-28 cursor-pointer hover:bg-blue-50"
                onClick={() => setSelectedDate(date)}
              >
                <p className="text-sm font-semibold">Day {i + 1}</p>
                {(appointments[date] || []).map((appt, j) => (
                  <p key={j} className="text-xs mt-1">
                    {appt.time} – {appt.patient}
                  </p>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {selectedDate && (
        <AppointmentForm
          selectedDate={selectedDate}
          onSave={saveAppointment}
          onCancel={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
};

export default Calendar;
