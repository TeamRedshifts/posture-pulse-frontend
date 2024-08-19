import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiLogoutCircleLine } from 'react-icons/ri';

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
      <div className='col-span-3 px-8 pt-6 mr-4 bg-slate-500 text-white'>
        <div>
          <h2 className='font-bold text-2xl tracking-wide'>PosturePulse<span className='align-super font-normal text-md'>&reg;</span></h2>
          <p className='text-xs uppercase tracking-wide'>AI physiotherapy assistant</p>
        </div>
        <div>
          <ul className='mt-8'>
            <li className='mb-4'>
              <Link to='/' className='flex items-center border-2 border-slate-400 rounded-lg py-2 px-4 hover:bg-slate-700 hover:border-slate-600 hover:text-white'>
                <RiLogoutCircleLine className='mr-2' />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
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