import React, { useEffect, useState } from 'react';
import { LuLayoutDashboard } from 'react-icons/lu';
import { RiAddFill, RiLogoutCircleLine } from 'react-icons/ri';
import { TbBulb } from 'react-icons/tb';
import { Link } from 'react-router-dom';

import Cookies from 'universal-cookie';


export default function Sidebar({ poseList, currentPose, setCurrentPose }) {
  const cookie = new Cookies();
  const [isDoc, setIsDoc] = useState(false);

  useEffect(() => {
    const email = cookie.get('email');
    if (email.includes('doc')) {
      setIsDoc(true);
    }
  }, []);
return (
    <div className=''>
        <div className='w-full h-screen px-10 pt-6 mr-4 bg-slate-500 text-white'>
        <div className='mt-2'>
          <h2 className='font-bold text-2xl tracking-wide'>PosturePulse</h2>
          <p className='text-xs uppercase tracking-wide'>AI physiotherapy assistant</p>
        </div>
        <div>
          <ul className='mt-8'>
          <li className={`mb-4 ${isDoc ? "block":"hidden"}`}>
              <Link to='/view-patient-list' className='flex items-center border-2 border-slate-600 rounded-lg py-2 px-4 bg-slate-600 hover:bg-slate-700 hover:text-white'>
                <RiAddFill className='mr-2' />
                <span>New Plan</span>
              </Link>
            </li>
            <li className='mb-4'>
              <Link to='/view-plan' className='flex items-center border-2 border-slate-400 rounded-lg py-2 px-4 hover:bg-slate-700 hover:border-slate-600 hover:text-white'>
                <LuLayoutDashboard className='mr-2' />
                <span>Dashbord</span>
              </Link>
            </li>
            <li className='mb-4'>
              <Link to='/tutorials' className='flex items-center border-2 border-slate-400 rounded-lg py-2 px-4 hover:bg-slate-700 hover:border-slate-600 hover:text-white'>
                <TbBulb className='mr-2' />
                <span>Tutorials</span>
              </Link>
            </li>
            <li className='mb-4'>
              <Link to='/' className='flex items-center border-2 border-slate-400 rounded-lg py-2 px-4 hover:bg-slate-700 hover:border-slate-600 hover:text-white'>
                <RiLogoutCircleLine className='mr-2' />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
)};