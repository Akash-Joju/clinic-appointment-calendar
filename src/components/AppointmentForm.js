// 📁 src/components/AppointmentForm.js
import React, { useState } from 'react';

const AppointmentForm = ({ onSave, selectedDate, initialData = {}, onCancel }) => {
  const [patient, setPatient] = useState(initialData.patient || '');
  const [doctor, setDoctor] = useState(initialData.doctor || '');
  const [time, setTime] = useState(initialData.time || '');

  const patients = ['Akash', 'Akhil', 'Alfin'];
  const doctors = ['Dr. Roy', 'Dr. Nisha', 'Dr. Paul'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patient || !doctor || !time) {
      alert('Please fill all fields');
      return;
    }

    onSave({ patient, doctor, time, date: selectedDate });
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow max-w-md w-full mx-auto mt-4 text-black dark:text-white">
      <h2 className="text-lg font-bold mb-4">Appointment for {selectedDate}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Select Patient</label>
          <select
            className="w-full border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
          >
            <option value="">-- Choose Patient --</option>
            {patients.map((p, i) => (
              <option key={i} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Select Doctor</label>
          <select
            className="w-full border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
          >
            <option value="">-- Choose Doctor --</option>
            {doctors.map((d, i) => (
              <option key={i} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Time</label>
          <input
            type="time"
            className="w-full border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded" onClick={onCancel}>Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            {initialData.patient ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
