import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase'; // Adjust the import path as needed
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';

import Chart from 'chart.js/auto';
import  { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { RiAddFill, RiLogoutCircleLine } from 'react-icons/ri';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);


function ViewPlan() {
  const [plans, setPlans] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Time spent (seconds)',
        data: [300, 400, 200, 500, 700, 600],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0, // Adds some curve to the line
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchPlans = async () => {
      if (user) {
        const q = query(collection(db, 'plans'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const userPlans = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPlans(userPlans);
      }
    };

    fetchPlans();
  }, [user]);

  const handleCardClick = (plan) => {
    navigate('/start', { state: { plan } });
  };

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
              <a href='#' className='flex items-center border-2 border-slate-600 rounded-lg py-2 px-4 bg-slate-600 hover:bg-slate-700 hover:text-white'>
                <RiAddFill className='mr-2' />
                <span>New Plan</span>
              </a>
            </li>
            <li className='mb-4'>
              <a href='#' className='flex items-center border-2 border-slate-400 rounded-lg py-2 px-4 hover:bg-slate-700 hover:border-slate-600 hover:text-white'>
                <RiLogoutCircleLine className='mr-2' />
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* content */}
      <div className='col-span-9 py-6 pl-4 pr-8'>
        <div className='mb-4'>
          <div className='flex items-center'>
            <FaRegUserCircle className='text-3xl mr-2' />
            <h2 className='text-3xl font-bold'>Hi, John Doe</h2>
          </div>
        </div>
        <div className='my-4'>
          <h2 className="text-2xl font-bold mb-4">My Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
            {plans.map(plan => (
              <div
                key={plan.id}
                className="bg-white shadow-md rounded-xl overflow-clip cursor-pointer grid grid-cols-6"
                onClick={() => handleCardClick(plan)}
              >
                <div className='col-span-2'>
                  <img src='https://via.placeholder.com/150' alt='plan' className='w-full h-full object-cover' />
                </div>
                <div className='col-span-4 py-2 px-4'>
                  <h2 className="text-xl font-semibold mb-2">{plan.planName}</h2>
                  <ul className="list-disc pl-5">
                    {plan.exercises.map((exercise, index) => (
                      <li key={index} className="list-disc">
                        {exercise.name} - {exercise.duration} seconds
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-500 mt-2">Created at: {new Date(plan.createdAt.seconds * 1000).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className=''>
          <h2 className='text-2xl font-bold mb-4'>My Progress</h2>
          <div className='w-full h-[330px]'>
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPlan;