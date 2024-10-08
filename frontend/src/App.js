import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Home from './pages/Home/Home'
import Yoga from './pages/Yoga/Yoga'
import Yoga1 from './pages/Yoga/Yoga1'
import ViewPatientList from './pages/ViewPatientList/ViewPatientList'

import Tutorials from './pages/Tutorials/Tutorials'
import CreatePlan from './pages/CreatePlan/CreatePlan'
import ViewPlan from './pages/ViewPlan/ViewPlan'
import RunModel from './pages/RunModel/RunModel'
import './App.css'

import Login from './pages/Login'
import Register from './pages/Register'

import ContactTherapist from './pages/ContactTherapist/ContactTherapist'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/' element={<Home />}/>
        <Route path='/start' element={<Yoga />} />
        <Route path='/test' element={<Yoga1 />} />
        <Route path='/tutorials' element={<Tutorials />} />
        <Route path='/create-plan' element={<CreatePlan />} />
        <Route path='/view-plan' element={<ViewPlan />} />
        <Route path="/run_model" element={<RunModel />} />
        <Route path="/contact-therapist" element={<ContactTherapist />} />
        <Route path="/view-patient-list" element={<ViewPatientList />} />
        
      </Routes>
    </Router>
  )
}


