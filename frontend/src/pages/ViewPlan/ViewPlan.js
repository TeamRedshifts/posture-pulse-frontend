import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase'; // Adjust the import path as needed
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function ViewPlan() {
  const [plans, setPlans] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Physiotherapy Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map(plan => (
          <div
            key={plan.id}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
            onClick={() => handleCardClick(plan)}
          >
            <h2 className="text-xl font-semibold mb-2">{plan.planName}</h2>
            <ul className="list-disc pl-5">
              {plan.exercises.map((exercise, index) => (
                <li key={index} className="mb-1">
                  {exercise.name} - {exercise.duration} seconds
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-2">Created at: {new Date(plan.createdAt.seconds * 1000).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewPlan;