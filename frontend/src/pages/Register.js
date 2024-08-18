// src/Register.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import  heroImage from '../utils/images/landing_page_hero_image.svg';
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-200">
      <div className="w-[60%] h-[70vh] rounded-xl overflow-hidden bg-slate-500 grid grid-cols-12 shadow-lg">
        <div className="bg-white h-full px-16 py-4 col-span-7 text-center">
          <img src={heroImage} alt="hero image" width={300} className="pt-10 pb-6 mx-auto"/>
          <Link to='/' className="text-3xl hover:text-black font-bold">PosturePusle</Link>
          <p className='text-xs uppercase tracking-wider'>AI physiotherapy assistant</p>
        </div>
        <div className=" col-span-5 px-8 relative">
          <div className="absolute top-1/2 -translate-y-1/2 w-[81%]">
            <h2 className="text-xl font-bold text-white mb-4 w-fit mx-auto">Sign up</h2>
            <form onSubmit={handleRegister}>
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
              <button type="submit" className="w-full px-3 py-2 m-1 rounded-lg bg-slate-700 text-white font-bold mt-3">Sign up</button>
              <p className="text-center mt-2 text-sm">
                Already have an account? <a href="/login" className="text-slate-200 underline hover:text-slate-400">Login</a>
              </p>
            </form>
          </div>
          </div>
      </div>
    </div>
  );
}

export default Register;