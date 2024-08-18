import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs';
import React, { useRef, useState, useEffect } from 'react'
import backend from '@tensorflow/tfjs-backend-webgl'
import Webcam from 'react-webcam'
import { count } from '../../utils/music'; 
 
import Instructions from '../../components/Instrctions/Instructions';

import './Yoga.css'
 
import DropDown from '../../components/DropDown/DropDown';
import { poseImages } from '../../utils/pose_images';
import { POINTS, keypointConnections } from '../../utils/data';
import { drawPoint, drawSegment } from '../../utils/helper'
import Navbar from '../../components/Navbar';

import { useLocation } from 'react-router-dom';





const ACCEPTANCE_THRESHOLD = 0.75

let skeletonColor = 'rgb(255,255,255)'
let poseList = [
  'Calf Stretch', 'Chair', 'Cobra', 'Dog', 'No Pose', 'Shoulderstand', 'Side Leg Raise', 'Single Leg Raise', 'Traingle', 'Tree', 'Warrior'
]

let interval

// flag variable is used to help capture the time when AI just detect 
// the pose as correct(probability more than threshold)
let flag = false


function Yoga() {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)

  const location = useLocation();
  const { plan } = location.state || { plan: { name: "No Pose" } };
  
  const [startingTime, setStartingTime] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [poseTime, setPoseTime] = useState(0)
  const [bestPerform, setBestPerform] = useState(0)
  const [currentPose, setCurrentPose] = useState('Tree')
  const [isStartPose, setIsStartPose] = useState(false)
  
  const [exerciseNumber, setExerciseNumber] = useState(0)
  const [exerciseDuration, setExerciseDuration] = useState(0)
  const [isCorrect, setIsCorrect] = useState(false)


  useEffect(async () => {
    tf.setBackend('webgl');
    await tf.ready()
  }, [])


  useEffect(() => {
    if (plan.name !== "No Pose") {
      if (exerciseNumber < plan.exercises.length) {
        console.log("CHANGING EXERCISE", exerciseNumber)
        setCurrentPose(plan.exercises[exerciseNumber].name)
        setExerciseDuration(plan.exercises[exerciseNumber].duration)
        setPoseTime(plan.exercises[exerciseNumber].duration)
      } else {
        console.log("NO MORE EXERCISES")
      }
    } else {
      console.log("NO POSE")
    }
  }, [exerciseNumber])
  
  useEffect(() => {
    const timeDiff = startingTime === 0 ? 0 : (currentTime - startingTime)/1000
    console.log(timeDiff, "was the time Diff")
    if(flag) {
      if (poseTime > 0) {
        setPoseTime(exerciseDuration - timeDiff)
      }
      if (poseTime <= 0) {
        console.log("FDFLJFLKSDJLFJSDL")
        setPoseTime(0)
        stopPose()
        setExerciseNumber(exerciseNumber + 1)
        setIsCorrect(false)
      }
    }
    if((currentTime - startingTime)/1000 > bestPerform) {
      setBestPerform(timeDiff)
    }
  }, [currentTime])

  useEffect(() => {
    if (!isCorrect) {
      setPoseTime(exerciseDuration)
    }
  }, [isCorrect])


  useEffect(() => {
    // setCurrentTime(0)
    setPoseTime(exerciseDuration)
    setBestPerform(0)
    console.log(currentPose)
  }, [currentPose])

  // const CLASS_NO = {
  //   Calf_Stretch: 0,
  //   Chair: 1,
  //   Cobra: 2,
  //   Dog: 3,
  //   No_Pose: 4,
  //   Shoulderstand: 5,
  //   Side_Leg_Raise: 6,
  //   Single_Leg_Raise: 7,
  //   Traingle: 8,
  //   Tree: 9,
  //   Warrior: 10,
  // }

  const CLASS_NO = {}

  for (let i = 0; i < poseList.length; i++) {
    CLASS_NO[poseList[i]] = i
  }

  function get_center_point(landmarks, left_bodypart, right_bodypart) {
    let left = tf.gather(landmarks, left_bodypart, 1)
    let right = tf.gather(landmarks, right_bodypart, 1)
    const center = tf.add(tf.mul(left, 0.5), tf.mul(right, 0.5))
    return center
    
  }

  function get_pose_size(landmarks, torso_size_multiplier=2.5) {
    let hips_center = get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
    let shoulders_center = get_center_point(landmarks,POINTS.LEFT_SHOULDER, POINTS.RIGHT_SHOULDER)
    let torso_size = tf.norm(tf.sub(shoulders_center, hips_center))
    let pose_center_new = get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
    pose_center_new = tf.expandDims(pose_center_new, 1)

    pose_center_new = tf.broadcastTo(pose_center_new,
        [1, 17, 2]
      )
      // return: shape(17,2)
    let d = tf.gather(tf.sub(landmarks, pose_center_new), 0, 0)
    let max_dist = tf.max(tf.norm(d,'euclidean', 0))

    // normalize scale
    let pose_size = tf.maximum(tf.mul(torso_size, torso_size_multiplier), max_dist)
    return pose_size
  }

  function normalize_pose_landmarks(landmarks) {
    let pose_center = get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
    pose_center = tf.expandDims(pose_center, 1)
    pose_center = tf.broadcastTo(pose_center, 
        [1, 17, 2]
      )
    landmarks = tf.sub(landmarks, pose_center)

    let pose_size = get_pose_size(landmarks)
    landmarks = tf.div(landmarks, pose_size)
    return landmarks
  }

  function landmarks_to_embedding(landmarks) {
    // normalize landmarks 2D
    landmarks = normalize_pose_landmarks(tf.expandDims(landmarks, 0))
    let embedding = tf.reshape(landmarks, [1,34])
    return embedding
  }

  const runMovenet = async () => {
    const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};
    const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);

    // const poseClassifier = await tf.loadLayersModel('https://models.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json')
    const poseClassifier = await tf.loadLayersModel('/model/model.json');

    const countAudio = new Audio(count)
    countAudio.loop = true
    interval = setInterval(() => { 
        detectPose(detector, poseClassifier, countAudio)
    }, 100)
  }

  const detectPose = async (detector, poseClassifier, countAudio) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      let notDetected = 0 
      const video = webcamRef.current.video
      const pose = await detector.estimatePoses(video)
      const ctx = canvasRef.current.getContext('2d')
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      try {
        const keypoints = pose[0].keypoints 
        let input = keypoints.map((keypoint) => {
          if(keypoint.score > 0.4) {
            if(!(keypoint.name === 'left_eye' || keypoint.name === 'right_eye')) {
              drawPoint(ctx, keypoint.x, keypoint.y, 8, 'rgb(255,255,255)')
              let connections = keypointConnections[keypoint.name]
              try {
                connections.forEach((connection) => {
                  let conName = connection.toUpperCase()
                  drawSegment(ctx, [keypoint.x, keypoint.y],
                      [keypoints[POINTS[conName]].x,
                       keypoints[POINTS[conName]].y]
                  , skeletonColor)
                })
              } catch(err) {

              }
              
            }
          } else {
            notDetected += 1
          } 
          return [keypoint.x, keypoint.y]
        }) 
        if(notDetected > 4) {
          skeletonColor = 'rgb(255,255,255)'
          return
        }
        const processedInput = landmarks_to_embedding(input)
        const classification = poseClassifier.predict(processedInput)

        console.log(classification, currentPose, CLASS_NO[currentPose])

        classification.array().then((data) => {         
          const classNo = CLASS_NO[currentPose]
          console.log(data[0][classNo])
          if(data[0][classNo] > ACCEPTANCE_THRESHOLD) {
            
            if(!flag) {
              countAudio.play()
              setStartingTime(new Date(Date()).getTime())
              setIsCorrect(true)
              flag = true
            }
            setCurrentTime(new Date(Date()).getTime()) 
            skeletonColor = 'rgb(0,255,0)'
          } else {
            setIsCorrect(false)
            flag = false
            skeletonColor = 'rgb(255,255,255)'
            countAudio.pause()
            countAudio.currentTime = 0
          }
        })
      } catch(err) {
        console.log(err)
      }
      
      
    }
  }

  function startYoga(){
    setIsStartPose(true) 
    runMovenet()
  } 

  function stopPose() {
    setIsStartPose(false)
    clearInterval(interval)
  }

    

  if(isStartPose) {
    return (
      <div className="bg-white text-black min-w-full min-h-screen py-12">
        <div className="performance-container">
            <div className="pose-performance">
              <h4>Hold the pose for: {poseTime} s</h4>
            </div>
            <div className="pose-performance">
              <h4>Best: {bestPerform} s</h4>
            </div>
          </div>
        <div className='relative flex justify-center items-center'>
          <div>
            <Webcam 
              width='640px'
              height='480px'
              id="webcam"
              ref={webcamRef}
              style={{
                position: 'absolute',
                left: 120,
                top: 100,
                padding: '0px',
              }}
            />
            <canvas
              ref={canvasRef}
              id="my-canvas"
              width='640px'
              height='480px'
              style={{
                position: 'absolute',
                left: 120,
                top: 100,
                zIndex: 1
              }}
            >
            </canvas>
          </div>
          <div>
              <img 
                src={poseImages[currentPose]}
                className="pose-img"
              />
          </div>
        </div>
        <button
          onClick={stopPose}
          className="mx-auto block border-2 border-slate-500 shadow-md shadow-slate-200 hover:shadow-md hover:shadow-slate-300 hover:bg-slate-200 transition-all delay-50 px-10 py-1 rounded-md"
        >Stop Pose</button>
      </div>
    )
  }

  return (
    <div
      className="bg-white text-black"
    >
      <DropDown
        poseList={poseList}
        currentPose={currentPose}
        setCurrentPose={setCurrentPose}
      />
      <Instructions
          currentPose={currentPose}
        />
      <div className='w-full py-6'>
      <button
          onClick={startYoga}
          className="mx-auto block border-2 border-slate-500 shadow-md shadow-slate-200 hover:shadow-md hover:shadow-slate-300 hover:bg-slate-200 transition-all delay-50 px-10 py-1 rounded-md"
        >
            Start Pose
        </button>
      </div>
    </div>
  )
}

export default Yoga