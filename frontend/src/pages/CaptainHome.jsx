import React, { useRef, useState, useEffect, useContext, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import CaptainDetails from '../Components/CaptainDetails'
import RidePopUp from '../Components/RidePopUp'
import ConfirmRidePopup from '../Components/ConfirmRidePopup'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmridePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const ridePopupPanelRef = useRef(null);
  const confirmridePopupPanelRef = useRef(null);
  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)
  const [ride, setRide] = useState(null)
  

  useEffect(() => {
    socket.emit('join', {
      userId: captain?._id,
      userType: 'captain'
    })

    const updateLocation = () => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit('update-location-captain', {
            userId: captain?._id,
            location:{
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }
    const locationInterval = setInterval(updateLocation,10000)
    updateLocation()
  }, []);

  socket.on('new-ride', (data) => {
    setRide(data)
    setRidePopupPanel(true)
  })

  async function confirmRide() {
    
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      { rideId: ride._id, captainId: captain?._id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    setRidePopupPanel(false);
    setConfirmRidePopupPanel(true);
  }

  useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, {
      transform: ridePopupPanel ? "translateY(0%)" : "translateY(100%)",
      duration: 0.5,
      ease: "power2.inOut"
    });
  }, [ridePopupPanel]);

  useGSAP(() => {
    gsap.to(confirmridePopupPanelRef.current, {
      transform: confirmridePopupPanel ? "translateY(0%)" : "translateY(100%)",
      duration: 0.5,
      ease: "power2.inOut"
    });
  }, [confirmridePopupPanel]);


  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-full'>
        <img className='w-16' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png' />
        <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-3/5 '>
        <img className='h-full w-full object-cover' src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif'></img>
      </div>
      <div className='h-2/5 p-6'>
        <CaptainDetails />
      </div>
      <div ref={ridePopupPanelRef} className='w-full fixed z-10  bottom-0 translate-y-full  bg-white px-3 py-6 pt-12'>
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />

      </div>

      <div ref={confirmridePopupPanelRef} className='w-full h-screen fixed z-10  bottom-0 translate-y-full  bg-white px-4 py-6 pt-12'>
        <ConfirmRidePopup
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
      </div>

    </div>
  )
}

export default CaptainHome