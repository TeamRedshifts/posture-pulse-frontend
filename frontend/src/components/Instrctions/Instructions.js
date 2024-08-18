import React, { useState } from 'react'

import { poseInstructions } from '../../utils/data'

import { poseImages } from '../../utils/pose_images'

import './Instructions.css'

export default function Instructions({ currentPose }) {

    const [instructions, setInsntructions] = useState(poseInstructions)

    return (
        <div className="bg-white text-black flex gap-6 justify-center items-center py-10">
            <ul className="instructions-list block px-10">
                {instructions[currentPose].map((instruction) => {
                    return(
                        <li className="instruction">{instruction}</li>
                    )
                    
                })}
            </ul>
            <img 
                className="pose-demo-img block shadow-xl rounded-xl border-2 border-slate-500"
                src={poseImages[currentPose]}
            />
        </div>
    )
}
