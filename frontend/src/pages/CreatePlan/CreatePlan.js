import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase'; // Adjust the import path as needed
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { exercises } from '../../utils/data';
import { useNavigate } from 'react-router-dom';

import { IoIosArrowBack } from 'react-icons/io';
import { div } from '@tensorflow/tfjs';
import { MdDelete } from 'react-icons/md';

import Sidebar from '../../components/Sidebar';



const planTypes = ['neck', 'leg', 'shoulders'];

function CreatePlan() {
  const [planName, setPlanName] = useState('');
  const [planType, setPlanType] = useState('neck');
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [showExerciseList, setShowExerciseList] = useState(false);
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAddExercise = (exercise) => {
    setSelectedExercises([...selectedExercises, { ...exercise, duration: 0 }]);
    setShowExerciseList(false); // Hide the exercise list after adding an exercise
  };

  const handleRemoveExercise = (id) => {
    setSelectedExercises(selectedExercises.filter(ex => ex.id !== id));
  };

  const handleDurationChange = (id, duration) => {
    setSelectedExercises(selectedExercises.map(ex => ex.id === id ? { ...ex, duration: parseInt(duration) } : ex));
  };

  const handleOutsideClick = (e) => {
    setShowExerciseList(false);
  };

  const handleSubmit = async () => {
    if (!user) {
      console.log('User not authenticated');
      return;
    }
    if (!planName || !planType || selectedExercises.length === 0) {
      console.log('Please fill all fields');
      setErrorMessage('Please fill all fields');
      return;
    }
  
    try {
      const docRef = await addDoc(collection(db, 'plans'), {
        userId: user.uid,
        planName,
        planType,
        exercises: selectedExercises,
        createdAt: new Date()
      });
      console.log('Plan submitted with ID:', docRef.id);
      setErrorMessage('');
      setSuccessMessage('Plan submitted successfully!');
      setTimeout(() => {
      //  navigate('/view-plan');
      }, 2000); // Redirect after 2 seconds
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-12 gap-4">
      {/* side bar */}
      <div className='col-span-3'>
        <Sidebar />
      </div>
      {/* content */}
      <div className='col-span-9 py-6 pl-4 pr-8'>
        <div className="container mx-auto p-4">
          <div className='px-10'>
            <div className='flex items-center mb-8'>
              <a href="view-plan" className='border rounded-full p-1 inline mr-2'><IoIosArrowBack /></a>
              <h1 className="text-2xl font-bold inline-block">Create New Plan</h1>
            </div>
            <div className="mb-4 flex items-center justify-between">
              <label className="text-sm w-[10%] font-medium text-gray-700">Plan Name</label>
              <input
                type="text"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                placeholder="Enter plan name"
                className="ml-6 flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <label className="text-sm w-[10%] font-medium text-gray-700">Plan Type</label>
              <select
                value={planType}
                onChange={(e) => setPlanType(e.target.value)}
                className="ml-6 flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {planTypes.map(ptype =>  <option key={ptype} value={ptype}>{ptype}</option>)}
              </select>
            </div>
            <div className="my-4">
              <button
                onClick={() => setShowExerciseList(!showExerciseList)}
                className="bg-slate-500 hover:bg-slate-600 text-white px-8 py-2 rounded-md mx-auto block"
              >
                View Exercises
              </button>
              {showExerciseList && planType && (
                <div className='w-full h-screen absolute top-0 left-0'>
                  <div className='bg-black opacity-70 w-full h-full' onClick={handleOutsideClick} />
                  <div className='bg-white w-fit py-6 px-14 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <div className="text-center">
                      <h2 className="text-xl font-semibold mb-4">Exercise List</h2>
                      <ul className="list-disc pl-5 text-left">
                        {exercises[planType].map(exercise => (
                          <li key={exercise.id} className="mb-2">
                            {exercise.name}
                            <button
                              onClick={() => handleAddExercise(exercise)}
                              className="ml-4 bg-slate-600 text-white px-6 py-1 rounded-md"
                            >
                              Add
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="mb-4">
              <div className='h-[2px] w-full bg-slate-200 mt-8 mb-4'/>
              <h2 className="text-xl font-semibold mb-4">Selected Exercises</h2>
              <ul className="">
                {selectedExercises.map(exercise => (
                  <li key={exercise.id} className="mb-2 flex items-center">
                    {exercise.name}
                    <input
                      type="number"
                      value={exercise.duration}
                      onChange={(e) => handleDurationChange(exercise.id, e.target.value)}
                      placeholder="Duration (seconds)"
                      className="ml-2 px-2 py-1 border w-20 text-center border-gray-300 rounded-md shadow-sm sm:text-sm"
                    />
                    <button
                      onClick={() => handleRemoveExercise(exercise.id)}
                      className="px-2 py-1 rounded-md text-xl"
                    >
                      <MdDelete />
                    </button>
                  </li>
                ))}
              </ul>
              <div className=''>
                <button
                  onClick={handleSubmit}
                  className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-md mt-3"
                >
                  Submit Plan
                </button>
              </div>
            </div>
            {successMessage && (
              <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePlan;