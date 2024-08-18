import React from 'react';
import { useLocation } from 'react-router-dom';

function RunModel() {
  const location = useLocation();
  const { plan } = location.state;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Run Model for {plan.planName}</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Exercises</h2>
        <ul className="list-disc pl-5">
            `Fuck ${JSON.stringify(plan)}`
        </ul>
        <p className="text-sm text-gray-500 mt-2">Created at: {new Date(plan.createdAt.seconds * 1000).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default RunModel;