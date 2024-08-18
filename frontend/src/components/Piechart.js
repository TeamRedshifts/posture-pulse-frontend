import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { db, auth } from '../firebase'; // Adjust the import path as needed
import { collection, getDocs, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [username, setUsername] = useState('');
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setUsername(user.displayName || user.email);
        const q = query(collection(db, 'exercises'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => doc.data());
        setExerciseData(data);
      }
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData();
      }
    });
  }, []);

  const chartData = {
    labels: exerciseData.map(exercise => exercise.name),
    datasets: [
      {
        label: 'Exercise Time (seconds)',
        data: exerciseData.map(exercise => exercise.duration),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Exercise Time Distribution for {username}</h1>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;