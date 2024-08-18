import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase'; // Adjust the import path as needed
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { exercises } from '../../utils/data';
import { useNavigate } from 'react-router-dom';



const planTypes = ['neck', 'leg', 'shoulders'];

function CreatePlan() {
  const [planName, setPlanName] = useState('');
  const [planType, setPlanType] = useState('');
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [showExerciseList, setShowExerciseList] = useState(false);
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
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

  const handleSubmit = async () => {
    if (!user) {
      console.log('User not authenticated');
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
      setSuccessMessage('Plan submitted successfully!');
      setTimeout(() => {
       navigate('/view-plan');
      }, 2000); // Redirect after 2 seconds
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Physiotherapy Plan</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Plan Name:</label>
        <input
          type="text"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          placeholder="Enter plan name"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Plan Type</label>
        <select
          value={planType}
          onChange={(e) => setPlanType(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {/* <option value="" disabled>Select plan type</option>
          <option value="strength">Strength</option>
          <option value="flexibility">Flexibility</option>
          <option value="balance">Balance</option>
          <option value="endurance">Endurance</option> */}

          {planTypes.map(ptype =>  <option value={ptype}>{ptype}</option>)}
        </select>
      </div>
      <div className="mb-4">
        <button
          onClick={() => setShowExerciseList(!showExerciseList)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Exercise
        </button>
        {showExerciseList && planType && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Exercise List</h2>
            <ul className="list-disc pl-5">
              {exercises[planType].map(exercise => (
                <li key={exercise.id} className="mb-2">
                  {exercise.name}
                  <button
                    onClick={() => handleAddExercise(exercise)}
                    className="ml-2 bg-green-500 text-white px-2 py-1 rounded-md"
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Selected Exercises</h2>
        <ul className="list-disc pl-5">
          {selectedExercises.map(exercise => (
            <li key={exercise.id} className="mb-2 flex items-center">
              {exercise.name}
              <input
                type="number"
                value={exercise.duration}
                onChange={(e) => handleDurationChange(exercise.id, e.target.value)}
                placeholder="Duration (seconds)"
                className="ml-2 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                onClick={() => handleRemoveExercise(exercise.id)}
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-indigo-500 text-white px-4 py-2 rounded-md"
      >
        Submit Plan
      </button>
      {successMessage && (
      <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
        {successMessage}
      </div>
    )}
    </div>
  );
}

export default CreatePlan;