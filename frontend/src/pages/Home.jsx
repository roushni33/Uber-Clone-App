import React, { use, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../Components/LocationSearchPanel'
import VehiclePanel from '../Components/VehiclePanel'
import ConfirmRide from '../Components/ConfirmRide'
import LookingForDriver from '../Components/LookingForDriver'
import WaitingForDriver from '../Components/WaitingForDriver'



const Home = () => {
  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [panelOpen, setPanelOpen] = useState(false)
  const vehiclePanelRef = useRef(null)
  const ConfirmRidePanelRef = useRef(null)
  const VehicleFoundRef = useRef(null)
  const WaitingForDriverRef = useRef(null)
  const panelRef = useRef(null)
  const planelCloseRef = useRef(null)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const[ConfirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound , setVehicleFound] = useState(false)
  const [WaitingForDriverPanel, setWaitingForDriverPanel] = useState(false)



  const submitHandler = (e) => {
    e.preventDefault()
   }
  useGSAP(() => {
    if (!panelRef.current) return;
    gsap.to(panelRef.current, {
      height: panelOpen ? "70%" : "0%",
      padding: panelOpen ? 24 : "0",
      duration: 0.5,
      ease: "power2.inOut"
    });
    gsap.to(planelCloseRef.current, {
      opacity: panelOpen ? 1 : 0,
      duration: 0.5,
      ease: "power2.inOut"
    });
  }, [panelOpen]);



  useGSAP(() => {
      gsap.to(vehiclePanelRef.current, {
      transform: vehiclePanelOpen ? "translateY(0%)" : "translateY(100%)",
      duration: 0.5,
      ease: "power2.inOut"
    });
  }, [vehiclePanelOpen]);

  useGSAP(() => {
      gsap.to(ConfirmRidePanelRef.current, {
      transform: ConfirmRidePanel ? "translateY(0%)" : "translateY(100%)",
      duration: 0.5,
      ease: "power2.inOut"
    });
  }, [ConfirmRidePanel]);

  
  useGSAP(() => {
     gsap.to(VehicleFoundRef.current, {
      transform: vehicleFound ? "translateY(0%)" : "translateY(100%)",
      duration: 0.5,
      ease: "power2.inOut"
    });
  }, [vehicleFound]);


  useGSAP(() => {
     gsap.to(WaitingForDriverRef.current, {
      transform: WaitingForDriverPanel ? "translateY(0%)" : "translateY(100%)",
      duration: 0.5,
      ease: "power2.inOut"
    });
  }, [WaitingForDriverPanel]);


  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png'></img>
      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif'></img>
      </div>
      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full '>

        <div className='h-[30%] p-6 bg-white p-5 relative'>
          <h5 ref={planelCloseRef} onClick={() => {
            setPanelOpen(false)
          }}
            className='absolute right-6 top-6 opacity-0 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a  trip</h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <div className="line absolute  h-16 w-1 top-[40%] left-10 bg-gray-900 rounded-full"></div>
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5'
              type="text"
              placeholder='Add a pick-up location' />
            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5'
              type="text"
              placeholder='Enter your destination' />
          </form>
        </div>
        <div ref={panelRef} className='bg-white h-0 '>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} />
        </div>
      </div>

      <div ref={vehiclePanelRef} className='w-full fixed z-10  bottom-0  translate-y-full bg-white px-3 py-10 pt-12'>
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen} />
      </div>

      <div ref={ConfirmRidePanelRef} className='w-full fixed z-10  bottom-0  translate-y-full bg-white px-3 py-6 pt-12'>
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}/>
      </div>

      <div ref={VehicleFoundRef} className='w-full fixed z-10  bottom-0  translate-y-full bg-white px-3 py-6 pt-12'>
            <LookingForDriver setVehicleFound={setVehicleFound}/>
      </div>

      <div ref={WaitingForDriverRef} className='w-full fixed z-10  bottom-0 translate-y-full  bg-white px-3 py-6 pt-12'>
            <WaitingForDriver setWaitingForDriverPanel={setWaitingForDriverPanel}  />
      </div>


    </div>
  )
}

export default Home