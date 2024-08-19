import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiLogoutCircleLine } from 'react-icons/ri';
import Sidebar from '../../components/Sidebar';

const ViewPatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Custom-defined list of patients
    const customPatientList = [
      { username: 'Kamal', email: 'kamal@example.com' },
      { username: 'Jane Smith', email: 'jane_smith@example.com' },
      { username: 'Alice Jones', email: 'alice_jones@example.com' },
      // Add more patients as needed
    ];

    setPatients(customPatientList);
  }, []);

  return (
    <div className="w-full min-h-screen grid grid-cols-12 gap-4">
      {/* side bar */}
      <div className='col-span-3'>
        <Sidebar />
      </div>
      {/* content */}
      <div className='col-span-9 p-8'>
        <h1 className='text-2xl font-bold mb-4'>Patient List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {patients.map((patient, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <Link to="/create-plan">
              <h2 className="text-xl font-semibold mb-2">{patient.username}</h2>
              <p className="text-sm text-gray-600">{patient.email}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewPatientList;