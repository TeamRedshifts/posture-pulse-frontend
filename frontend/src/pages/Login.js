// src/Login.js
import React, { useState } from "react";
import  heroImage from '../utils/images/landing_page_hero_image.svg';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
import { doSignInWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../contexts/authContext";
import { IoMdClose, IoMdWarning } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const cookie = new Cookies();

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { userLoggedIn } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if(!isLoggingIn){
      try {
        setIsLoggingIn(true);
        await doSignInWithEmailAndPassword(email, password);
        cookie.set('email', email, { path: '/' });
        navigate('/view-plan');
      } catch (error) {
        // alert(error.message);
        if(error.code == 'auth/invalid-credential'){
          setErrorMessage("Invalid Credentials. Try again.");
          setPassword("");
        }else{
          setErrorMessage(error.message);
        }
      } finally{
        setIsLoggingIn(false);
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-200">
      { userLoggedIn && <Navigate to='/view-plan' /> }
      <div className="lg:w-[60%] md:w-[80%] w-[90%] h-[70vh] rounded-xl overflow-hidden bg-slate-500 grid grid-cols-12 shadow-xl relative">
        <Link to='/' className="absolute top-2 left-2 p-2 bg-slate-100 rounded-full cursor-pointer hover:text-slate-600"><IoMdClose /> </Link>
        <div className="bg-white h-full px-16 py-4 md:col-span-7 hidden md:block text-center">
          <img src={heroImage} alt="hero image" width={300} className="pt-10 pb-6 mx-auto"/>
          <Link to='/' className="text-3xl hover:text-black font-bold">PosturePusle</Link>
          <p className='text-xs uppercase tracking-wider'>AI physiotherapy assistant</p>
        </div>
        <div className=" md:col-span-5 col-span-12 md:px-8 px-4 relative">
          <div className="absolute top-1/2 -translate-y-1/2 w-[81%]">
            <h2 className="text-xl font-bold text-white mb-4 w-fit mx-auto">Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {setEmail(e.target.value); setErrorMessage("");}}
                className="w-full px-3 py-2 m-1 rounded-lg"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {setPassword(e.target.value); setErrorMessage("");}}
                className="w-full px-3 py-2 m-1 rounded-lg"
                required
              />
              {
                errorMessage &&
                <div className="text-white flex items-center gap-1 ml-2 mt-2"><IoMdWarning className="inline" /> {errorMessage}</div>
              }
              {
                !isLoggingIn ?
                  <button type="submit" className="w-full px-3 py-2 m-1 rounded-lg bg-slate-700 text-white font-bold mt-3" disabled={isLoggingIn}>Login</button>
                :
                  <div className="w-full px-3 py-2 m-1 rounded-lg bg-slate-700 text-white font-bold mt-3 flex justify-center"><AiOutlineLoading3Quarters className="animate-spin my-1" /></div>
              }
              <p className="text-center mt-2 text-sm">
                Don't have an account? <Link to="/register" className="text-slate-200 underline hover:text-slate-400">sign up</Link>
              </p>
            </form>
          </div>
          </div>
      </div>
    </div>
  );
}

export default Login;
