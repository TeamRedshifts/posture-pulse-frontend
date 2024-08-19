import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiAddFill, RiLogoutCircleLine } from 'react-icons/ri';

const ContactTherapist = () => {
  const [matter, setMatter] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Matter submitted:', matter);
    // Reset the form
    setMatter('');
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-12 gap-4">
      {/* side bar */}
      <div className='col-span-3 px-8 pt-6 mr-4 bg-slate-500 text-white'>
        <div>
          <h2 className='font-bold text-2xl tracking-wide'>PosturePulse<span className='align-super font-normal text-md'>&reg;</span></h2>
          <p className='text-xs uppercase tracking-wide'>AI physiotherapy assistant</p>
        </div>
        <div>
          <ul className='mt-8'>
            <li className='mb-4'>
              <Link to='/create-plan' className='flex items-center border-2 border-slate-600 rounded-lg py-2 px-4 bg-slate-600 hover:bg-slate-700 hover:text-white'>
                <RiAddFill className='mr-2' />
                <span>New Plan</span>
              </Link>
            </li>


            <li className='mb-4'>
              <Link to='/contact-therapist' className='flex items-center border-2 border-slate-600 rounded-lg py-2 px-4 bg-slate-600 hover:bg-slate-700 hover:text-white'>
                <RiAddFill className='mr-2' />
                <span>Contact Therapist</span>
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
      {/* content */}
      <div className='col-span-9 p-8'>
        <h1 className='text-2xl font-bold mb-4'>Contact Therapist</h1>
        <form onSubmit={handleSubmit} className='bg-white shadow-md rounded-lg p-4'>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>Matter:</label>
            <textarea
              value={matter}
              onChange={(e) => setMatter(e.target.value)}
              placeholder="Enter your matter here"
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              rows="4"
            />
          </div>
          <button
            type="submit"
            className='bg-indigo-500 text-white px-4 py-2 rounded-md'
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactTherapist;