import React from 'react'
import './Tutorials.css'

import { tutorials, fixCamera } from '../../utils/data'
import { IoIosArrowBack } from 'react-icons/io';
import Sidebar from '../../components/Sidebar';

export default function Tutorials() {
    return (
        <div className="w-full min-h-screen grid grid-cols-12 gap-4">
            {/* side bar */}
            <div className='col-span-3'>
                <Sidebar />
            </div>
            {/* content */}
            <div className='col-span-9 py-6 pl-4 pr-8'>
                <div className='pl-10 pr-24 py-2'>
                <div className='flex items-center mb-8'>
                    <a href="view-plan" className='border rounded-full p-1 inline mr-2'><IoIosArrowBack /></a>
                    <h1 className="text-3xl font-bold inline-block">Basic Tutorial</h1>
                </div>
                    <ul className="list-disc">
                        {tutorials.map((tutorial) => (
                            <li className="mb-3">{tutorial}</li>
                        ))}
                    </ul>
                    <h1 className="text-3xl font-bold mt-8 mb-4">Camera Not Working?</h1>
                    <ul className="list-disc">
                        {fixCamera.map((points) => (
                            <li className="mb-3">{points}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
