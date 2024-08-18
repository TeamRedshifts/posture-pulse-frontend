import React from 'react'
import logo from '../logo.svg'
import { Link } from 'react-router-dom'
import { RiAddFill } from 'react-icons/ri'

export default function Navbar() {
    return (
        <div className='w-full px-8 py-3 border-b-2 shadow-sm flex justify-between items-center'>
            <Link to='/view-plan' className='font-bold tracking-wider text-lg hover:text-slate-600'>PosturePulse</Link>
            <div>
                <Link to='/create-plan'><RiAddFill /></Link>
            </div>
        </div>
    )
}
