// src/Login.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import  heroImage from '../utils/images/landing_page_hero_image.svg';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/view-plan');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-200">
      <div className="w-[60%] h-[70vh] rounded-xl overflow-hidden bg-slate-500 grid grid-cols-12 shadow-lg">
        <div className="bg-white h-full px-10 py-10 col-span-7">
          <img src={heroImage} alt="hero image" width={300} />
          <h2 className="text-3xl font-bold">PosturePusle</h2>
          <p className='text-xs uppercase tracking-wider'>AI physiotherapy assistant</p>
        </div>
        <div className=" col-span-5 px-8 relative">
          <div className="absolute top-1/2 -translate-y-1/2 w-[81%]">
            <h2 className="text-xl font-bold text-white mb-4 w-fit mx-auto">Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 m-1 rounded-lg"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 m-1 rounded-lg"
              />
              <button type="submit" className="w-full px-3 py-2 m-1 rounded-lg bg-slate-700 text-white font-bold mt-3">login</button>
            </form>
          </div>
          </div>
      </div>
    </div>
  );
}

export default Login;
