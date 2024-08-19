import React from 'react'
import { Link } from 'react-router-dom'
import  heroImage from '../../utils/images/landing_page_hero_image.svg';

import './Home.css'
import { div } from '@tensorflow/tfjs';

export default function Home() {

    return (
        <div>
        <div className='relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5'>
        {/* Hero Section */}
        <div className='max-w-6xl w-full h-screen flex flex-col justify-center relative'>
            <img
                src = {heroImage}
                alt='Image by FreePik'
                height="500"
                width="500"
                className='absolute md:block top-24 md:top-1/2 md:-translate-y-1/2 right-0 md:z-0 -z-10'
            />
            <div className='mt-72 md:mt-0'>
                <h1 className='md:text-7xl text-3xl font-extrabold'>PosturePulse</h1>
                <p className='md:text-sm text-xs mt-1 tracking-wider uppercase'>computer vision-based AI physiotherapy assistant</p>
            </div>
            <div className='mt-4 flex md:flex-row flex-col text-center md:gap-4 gap-2'>
                <a href='/login' className="hover:shadow-[0_2px_10px_rgba(0,118,255,23%)] hover:bg-slate-900 px-8 md:py-3 py-2 bg-slate-600 rounded-md text-white transition duration-200 ease-linear cursor-pointer">
                    Get Started!
                </a>
                <a href='/tutorials' className="hover:shadow-[0_2px_10px_rgba(0,0,0,23%)] px-8 md:py-3 py-2 bg-[rgba(255,255,255,0.2)] border-2 border-slate-400 rounded-md text-black transition duration-200 ease-linear cursor-pointer">
                    Tutorial
                </a>
            </div>
        </div>
        {/* About us */}
        <div className='max-w-6xl w-full md:my-40 md:text-left text-center flex md:flex-row flex-col justify-center items-center'>
            <div>
                <h2 className='md:text-5xl text-2xl font-extrabold md:w-[30vw] w-[80vw]'>Who are we?</h2>
            </div>
            <div className='text-left md:text-md text-sm mb-12 mt-4'>
                <p>
                We, <b>Team RedShifts</b>, are a group of undergraduates at the Department of Computer Science and Engineering, University of Moratuwa. Driven by the vision of making healthcare more accessible and efficient, we are developing an AI-based physiotherapy assistant. By harnessing advanced computer vision and AI technologies, we aim to revolutionize physiotherapy, ensuring that everyone, regardless of location or financial constraints, can access effective and personalized care. Our mission is to alleviate pain and improve the quality of life for millions worldwide.
                </p>
            </div>
        </div>
        </div>
        <footer className='w-full h-[120px] bg-slate-700 text-white px-20 py-10 text-center'>
            <h2 className='tracking-widest font-bold md:text-2xl text-lg'>PosturePulse</h2>
            <p className='md:text-sm text-xs tracking-wider'>Developed by Team RedShifts</p>
        </footer>
    </div>
    )
}
