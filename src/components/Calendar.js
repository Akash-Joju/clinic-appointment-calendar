// 📁 src/components/Calendar.js
import React, { useState, useEffect } from 'react';
import AppointmentForm from './AppointmentForm';

const Calendar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingInfo, setEditingInfo] = useState(null);
  const [appointments, setAppointments] = useState(
    JSON.parse(localStorage.getItem('appointments')) || {}
  );
  const [filterDoctor, setFilterDoctor] = useState('');
  const [filterPatient, setFilterPatient] = useState('');

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

    if (editingInfo) {
      updated[date][editingInfo.index] = appointment;
    } else {
      if (!updated[date]) updated[date] = [];
      updated[date].push(appointment);
    }

    setAppointments(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
    setSelectedDate(null);
    setEditingInfo(null);
  };

  const handleDeleteAppointment = (date, index) => {
    const updated = { ...appointments };
    updated[date].splice(index, 1);
    if (updated[date].length === 0) {
      delete updated[date];
    }
    setAppointments(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <h2 className="text-xl font-bold mb-4">Appointment Calendar</h2>

      <div className="flex flex-wrap gap-4 mb-4">
        <select
          value={filterDoctor}
          onChange={(e) => setFilterDoctor(e.target.value)}
          className="border p-2 rounded bg-white dark:bg-gray-700 dark:text-white"
        >
          <option value="">All Doctors</option>
          <option value="Dr. Roy">Dr. Roy</option>
          <option value="Dr. Nisha">Dr. Nisha</option>
          <option value="Dr. Paul">Dr. Paul</option>
        </select>

        <select
          value={filterPatient}
          onChange={(e) => setFilterPatient(e.target.value)}
          className="border p-2 rounded bg-white dark:bg-gray-700 dark:text-white"
        >
          <option value="">All Patients</option>
          <option value="Akash">Akash</option>
          <option value="Akhil">Akhil</option>
          <option value="Alfin">Alfin</option>
        </select>
      </div>

      {isMobile ? (
        <div>
          <input
            type="date"
            className="mb-4 border p-2 rounded bg-white dark:bg-gray-700 dark:text-white"
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          {selectedDate && (
            <div className="border p-4 rounded shadow mb-4 bg-white dark:bg-gray-800">
              <p className="font-semibold mb-2">{selectedDate}</p>
              {(appointments[selectedDate] || [])
                .filter(appt =>
                  (!filterDoctor || appt.doctor === filterDoctor) &&
                  (!filterPatient || appt.patient === filterPatient)
                )
                .map((appt, i) => (
                  <div key={i} className="flex justify-between text-sm mb-1">
                    <span>{appt.time} – {appt.patient}</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          setEditingInfo({ date: selectedDate, index: i, data: appt });
                          setSelectedDate(selectedDate);
                        }}
                        className="text-blue-400 text-xs"
                      >✏️</button>
                      <button
                        onClick={() => handleDeleteAppointment(selectedDate, i)}
                        className="text-red-400 text-xs"
                      >✕</button>
                    </div>
                  </div>
              ))}
              <button
                onClick={() => setSelectedDate(selectedDate)}
                className="mt-2 text-blue-500 underline"
              >Add Appointment</button>
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
                className="border p-2 rounded h-28 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800"
                onClick={() => setSelectedDate(date)}
              >
                <p className="text-sm font-semibold">Day {i + 1}</p>
                {(appointments[date] || [])
                  .filter(appt =>
                    (!filterDoctor || appt.doctor === filterDoctor) &&
                    (!filterPatient || appt.patient === filterPatient)
                  )
                  .map((appt, j) => (
                    <div key={j} className="flex justify-between text-xs mt-1">
                      <span>{appt.time} – {appt.patient}</span>
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingInfo({ date, index: j, data: appt });
                            setSelectedDate(date);
                          }}
                          className="text-blue-400 text-xs"
                        >✏️</button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAppointment(date, j);
                          }}
                          className="text-red-400 text-xs"
                        >✕</button>
                      </div>
                    </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {selectedDate && (
        <AppointmentForm
          selectedDate={selectedDate}
          initialData={editingInfo?.data}
          onSave={saveAppointment}
          onCancel={() => {
            setSelectedDate(null);
            setEditingInfo(null);
          }}
        />
      )}
    </div>
  );
};

export default Calendar;
