// src/components/AppointmentForm.js
import React, { useState } from 'react';

const AppointmentForm = ({ onSave, selectedDate, initialData = {}, onCancel }) => {
  const [patient, setPatient] = useState(initialData.patient || '');
  const [doctor, setDoctor] = useState(initialData.doctor || '');
  const [time, setTime] = useState(initialData.time || '');

  const patients = ['Akash', 'Joju', 'Alan'];
  const doctors = ['Dr. Jayabalan', 'Dr. Nisha', 'Dr. Paul'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patient || !doctor || !time) {
      alert('Please fill all fields');
      return;
    }

    onSave({ patient, doctor, time, date: selectedDate });
  };

  return (
    <div className="p-4 bg-white rounded shadow max-w-md w-full mx-auto mt-4">
      <h2 className="text-lg font-bold mb-4">Appointment for {selectedDate}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select className="w-full border p-2 rounded" value={patient} onChange={(e) => setPatient(e.target.value)}>
          <option value="">Select Patient</option>
          {patients.map((p, i) => <option key={i} value={p}>{p}</option>)}
        </select>

        <select className="w-full border p-2 rounded" value={doctor} onChange={(e) => setDoctor(e.target.value)}>
          <option value="">Select Doctor</option>
          {doctors.map((d, i) => <option key={i} value={d}>{d}</option>)}
        </select>

        <input type="time" className="w-full border p-2 rounded" value={time} onChange={(e) => setTime(e.target.value)} />

        <div className="flex justify-end gap-2">
          <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={onCancel}>Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
