// src/Register.js
import React, { useState } from "react";
import  heroImage from '../utils/images/landing_page_hero_image.svg';
import { Link, useNavigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { IoMdClose } from "react-icons/io";

function Register() {
  const [name, setName ] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);
  const [userType, setUserType] = useState("patient");
  const [isRegistering, setIsRegistering] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // password confirm check
    if(password !== confirmPassword){
      setWrongPassword(true);
      return;
    }
    if(!isRegistering){
      try {
        setIsRegistering(true);
        await doCreateUserWithEmailAndPassword(email, password);
        alert("Registration successful");
        navigate('/login');
      } catch (error) {
        alert(error.message);
      } finally{
        setIsRegistering(false);
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-200">
      <div className="md:w-[60%] w-[90%] h-[70vh] rounded-xl overflow-hidden bg-slate-500 grid grid-cols-12 shadow-lg relative">
        <Link to='/' className="absolute top-2 left-2 p-2 bg-slate-100 rounded-full cursor-pointer hover:text-slate-600"><IoMdClose /> </Link>
        <div className="bg-white h-full px-16 py-4 md:col-span-7 hidden md:block text-center">
          <img src={heroImage} alt="hero image" width={300} className="pt-10 pb-6 mx-auto"/>
          <Link to='/' className="text-3xl hover:text-black font-bold">PosturePusle</Link>
          <p className='text-xs uppercase tracking-wider'>AI physiotherapy assistant</p>
        </div>
        <div className=" md:col-span-5 col-span-12 md:px-8 px-4 relative">
          <div className="absolute top-1/2 -translate-y-1/2 w-[81%]">
            <h2 className="text-xl font-bold text-white mb-4 w-fit mx-auto">Register</h2>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 m-1 rounded-lg"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 m-1 rounded-lg"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {setPassword(e.target.value); setWrongPassword(false);}}
                className={`w-full px-3 py-2 m-1 rounded-lg ${wrongPassword ? 'border-red-500 border-2' : ''}`}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {setConfirmPassword(e.target.value); setWrongPassword(false);}}
                className={`w-full px-3 py-2 m-1 rounded-lg ${wrongPassword ? 'border-red-500 border-2' : ''}`}
                required
              />
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full px-3 py-2 m-1 rounded-lg"
              >
                <option value="patient">I'm a Patient</option>
                <option value="doctor">I'm a Physiotherapist</option>
              </select>

              <button type="submit" className="w-full px-3 py-2 m-1 rounded-lg bg-slate-700 text-white font-bold mt-3" disabled={isRegistering}>Sign up</button>
              <p className="text-center mt-2 text-sm">
                Already have an account? <Link to="/login" className="text-slate-200 underline hover:text-slate-400">Login</Link>
              </p>
            </form>
          </div>
          </div>
      </div>
    </div>
  );
}

export default Register;