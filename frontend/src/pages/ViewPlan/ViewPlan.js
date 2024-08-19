import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase'; // Adjust the import path as needed
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import {poseImages} from '../../utils/pose_images';
import Cookies from 'universal-cookie';

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

import Sidebar from '../../components/Sidebar';
import { RiAddFill } from 'react-icons/ri';

const cookie = new Cookies();

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function getImage (planType){
    if(planType === 'leg'){
        return poseImages['Leg'];
    }
    else if(planType === 'shoulder'){
        return poseImages['Shoulder'];
    }else if(planType === 'neck'){
        return poseImages['Neck'];
    }else{
        return poseImages['Shoulder'];
    }
}
function ViewPlan() {
  const [plans, setPlans] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');

  const data = {
    labels: ['12','13','14','15','16','17','18'],
    datasets: [
      {
        label: 'Time spent (seconds)',
        data: [30, 40, 20, 50, 70, 60],
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
        setPlans(userPlans.reverse());
        setIsLoading(false);
      }
    };

    fetchPlans();
    const email = cookie.get('email');
    setUsername(email.split('@')[0]);
  }, [user]);

  const handleCardClick = (plan) => {
    navigate('/start', { state: { plan } });
  };

  return (
    <div className="w-full h-screen grid grid-cols-12 gap-4">
      {/* side bar */}
      <div className='col-span-3'>
        <Sidebar />
      </div>
      {/* content */}
      <div className='col-span-9 py-6 pl-4 pr-8 h-screen overflow-y-scroll'>
        <div className='mb-4'>
          <div className='flex items-center'>
            <FaRegUserCircle className='text-3xl mr-2' />
            <h2 className='text-3xl font-bold capitalize'>Hi, {username}</h2>
          </div>
        </div>
        <div className='my-4'>
          <h2 className="text-2xl font-bold mb-4">My Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
            {isLoading && <p>Loading...</p>}
            {!isLoading && plans.length === 0 && (
              <div>
                <h2 className="text-xl font-semibold opacity-40">No plans available</h2>
                <Link to='/create-plan' className='my-2 w-[200px] flex items-center border-2 border-slate-500 text-white rounded-lg py-2 px-2 bg-slate-500 hover:bg-slate-700 hover:text-white'>
                  <RiAddFill className='mr-2' />
                  <span>Add New Plan</span>
                </Link>
              </div>
            )}
            {plans.map(plan => (
              <div
                key={plan.id}
                className="bg-white border-2 hover:scale-105 duration-200 border-slate-50 shadow-md rounded-xl overflow-clip cursor-pointer grid grid-cols-6 min-h-[150px]"
                onClick={() => handleCardClick(plan)}
              >
                <div className='col-span-2'>
                   
                
                <img src={getImage(plan.planType)} alt='plan' className='w-full h-full object-cover' />
                
                
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
        <div className='mt-4'>
          <h2 className='text-2xl font-bold mb-4'>My Progress</h2>
          <div className='w-full h-[330px]'>
            <Line data={data} options={options} />
          </div>

          {/* <div className='mt-4'><Piechart /></div> */}
        </div>
      </div>
    </div>
  );
}

export default ViewPlan;