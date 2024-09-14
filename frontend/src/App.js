import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Home from './pages/Home/Home'
import Yoga from './pages/Yoga/Yoga'
import Yoga1 from './pages/Yoga/Yoga1'
import ViewPatientList from './pages/ViewPatientList/ViewPatientList'

import Tutorials from './pages/Tutorials/Tutorials'
import CreatePlan from './pages/CreatePlan/CreatePlan'
import ViewPlan from './pages/ViewPlan/ViewPlan'
import ProtectedRoute from './pages/ProtectedRoute'
import RunModel from './pages/RunModel/RunModel'
import './App.css'

import Login from './pages/Login'
import Register from './pages/Register'

import ContactTherapist from './pages/ContactTherapist/ContactTherapist'
import { AuthProvider } from './contexts/authContext'

export default function App() {
  return (
    // <Router>
    <AuthProvider>
      <Routes>
        {/* open routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/' element={<Home />}/>
        
        {/* routes that need authentication */}
        <Route path='/start' element={<ProtectedRoute><Yoga /></ProtectedRoute>} />
        <Route path='/tutorials' element={<ProtectedRoute><Tutorials /></ProtectedRoute>} />
        <Route path='/create-plan' element={<ProtectedRoute><CreatePlan /></ProtectedRoute>} />
        <Route path='/view-plan' element={ <ProtectedRoute><ViewPlan /></ProtectedRoute> } />
        <Route path="/run_model" element={<ProtectedRoute><RunModel /></ProtectedRoute>} />
        <Route path="/contact-therapist" element={<ProtectedRoute><ContactTherapist /></ProtectedRoute>} />
        <Route path="/view-patient-list" element={<ProtectedRoute><ViewPatientList /></ProtectedRoute>} />
        
      </Routes>
    </AuthProvider>
    //</Router>
  )
}


