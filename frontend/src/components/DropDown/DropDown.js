import React from 'react'

import { poseImages } from '../../utils/pose_images'

import './DropDown.css'
import { RiArrowDropDownLine } from 'react-icons/ri'

export default function DropDown({ poseList, currentPose, setCurrentPose }) {
return (
        <div className='text-black w-full mt-12'>
        <button 
            className="dropdown-btn mx-auto block text-lg border-2 border-slate-500 shadow-md shadow-slate-200 hover:shadow-md hover:shadow-slate-300 hover:bg-slate-200 transition-all delay-50 px-14 py-2 rounded-md"
            type='button'
            data-bs-toggle="dropdown"
            id="pose-dropdown-btn"
            aria-expanded="false"
        >{currentPose}
        <RiArrowDropDownLine className='inline ml-2'/>
        </button>
        <ul class="dropdown-menu dropdown-custom-menu w-[30%] p-0 rounded-lg h-[82vh] shadow-md overflow-y-scroll" aria-labelledby="dropdownMenuButton1">
            {poseList.map((pose) => (
                <li onClick={() => setCurrentPose(pose)}>
                    <div class="dropdown-item-container flex gap-4 justify-between items-center border-2 m-2 px-10 rounded-lg text-lg">
                        <div>
                        <p className="dropdown-item-1">{pose}</p>
                        </div>
                        <div className='w-[200px]'>
                            <img 
                                src={poseImages[pose]}
                                className="dropdown-img"
                            />
                        </div>
                        
                    </div>
                </li>
            ))}
            
        </ul>
              
          
      </div>
    )
}
 