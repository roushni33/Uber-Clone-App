import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FinishRide from '../Components/FinishRide'

const CaptainRiding = () => {
    const [FinishRidePanel , setFinishRidePanel] = useState(false)
    const finishRidePanelref = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride
    

    useGSAP(() => {
     gsap.to(finishRidePanelref.current, {
      transform: FinishRidePanel ? "translateY(0%)" : "translateY(100%)",
      duration: 0.5,
      ease: "power2.inOut"
    });
  }, [FinishRidePanel]);
    return (
        <div className='h-screen relative'>
            <div className='fixed p-6 top-0 flex items-center justify-between w-full'>
                <img className='w-16' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png' />
                <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-4/5 '>
                <img className='h-full w-full object-cover' src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif'></img>
            </div>
            <div className='h-1/5 p-6 flex items-center relative justify-between bg-yellow-400'
                 onClick={() => {
                    setFinishRidePanel(true)
                 }}
            >
                <h5 onClick={() => {

                }}
                    className='p-1 text-center w-[95%] absolute top-0 '><i className="ri-arrow-up-wide-line text-3xl  pt-14"></i></h5>
                <h4 className='text-xl font-semibold '>4 KM away</h4>
                <button className='  bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
            </div>
            <div ref={finishRidePanelref} className='w-full fixed z-10  bottom-0 translate-y-full  bg-white px-3 py-6 pt-12'>
                <FinishRide 
                 ride={rideData}
                setFinishRidePanel={setFinishRidePanel} />
            </div>
        </div>
    )
}

export default CaptainRiding