import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { LuMail } from 'react-icons/lu'



const Footer = () => {
  return (
    <footer className='w-full flex flex-row justify-center items-center bg-slate-900'>
        <div className='py-5'>
            <div className='flex flex-row gap-5 items-center text-center justify-center text-2xl  text-slate-200'>
                <a href='mailto:redshifts.sl@gmail.com' className='hover:text-slate-500 transition-colors delay-150'>
                    <LuMail />
                </a>
                <a href='https://www.linkedin.com/in/sajitha-tj/' className='hover:text-slate-500 transition-colors delay-150' target='_blank'>
                    <FaLinkedin />
                </a>
                <a href='https://github.com/sajitha-tj/' className='hover:text-slate-500 transition-colors delay-150' target='_blank'>
                    <FaGithub />
                </a>
            </div>
            <div className='flex justify-center mt-4'>
                <p className='uppercase tracking-wider text-xs text-slate-400'>Designed and Developed by <b>Team RedShifts.</b></p>
            </div>
        </div>
    </footer>
  )
}

export default Footer