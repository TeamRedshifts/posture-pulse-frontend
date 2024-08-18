import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Home from './pages/Home/Home'
import Yoga from './pages/Yoga/Yoga'
import Yoga1 from './pages/Yoga/Yoga1'
import About from './pages/About/About'
import Tutorials from './pages/Tutorials/Tutorials'
import CreatePlan from './pages/CreatePlan/CreatePlan'
import ViewPlan from './pages/ViewPlan/ViewPlan'
import RunModel from './pages/RunModel/RunModel'
import './App.css'

import Login from './pages/Login'
import Register from './pages/Register'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/' element={<Home />}/>
        <Route path='/start' element={<Yoga />} />
        <Route path='/test' element={<Yoga1 />} />
        <Route path='/about' element={<About />} />
        <Route path='/tutorials' element={<Tutorials />} />
        <Route path='/create-plan' element={<CreatePlan />} />
        <Route path='/view-plan' element={<ViewPlan />} />
        <Route path="/run_model" element={<RunModel />} />
      </Routes>
    </Router>
  )
}


