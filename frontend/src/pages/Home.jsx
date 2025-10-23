import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../Components/LocationSearchPanel'
import VehiclePanel from '../Components/VehiclePanel'
import ConfirmRide from '../Components/ConfirmRide'
import LookingForDriver from '../Components/LookingForDriver'
import WaitingForDriver from '../Components/WaitingForDriver'
import axios from 'axios'
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../Components/LiveTracking'

const Home = () => {
  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [panelOpen, setPanelOpen] = useState(false)
  const [activeField, setActiveField] = useState(null) // 'pickup' or 'destination'
  const [suggestions, setSuggestions] = useState([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const vehiclePanelRef = useRef(null)
  const ConfirmRidePanelRef = useRef(null)
  const VehicleFoundRef = useRef(null)
  const WaitingForDriverRef = useRef(null)
  const panelRef = useRef(null)
  const planelCloseRef = useRef(null)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const [ConfirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [WaitingForDriverPanel, setWaitingForDriverPanel] = useState(false)
  const [fare, setFare] = useState({})
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null)
  const { user } = useContext(UserDataContext)
  const { socket } = useContext(SocketContext)
  const navigate = useNavigate()

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id })
  }, [user])

 
  useEffect(() => {
    const handleRideConfirmed = (ride) => {
      setVehicleFound(false)
      setWaitingForDriverPanel(true)
      setRide(ride)
    };
    const handleRideStarted = (ride) => {
      console.log(ride)
      setWaitingForDriverPanel(false)
      navigate('/riding', { state: { ride } })
    };

    socket.on('ride-confirmed', handleRideConfirmed);
    socket.on('ride-started', handleRideStarted);

    return () => {
      socket.off('ride-confirmed', handleRideConfirmed);
      socket.off('ride-started', handleRideStarted);
    };
  }, [socket, navigate]);

  const fetchSuggestions = async (input) => {
    if (!input || input.length < 3) {
      setSuggestions([]);
      return;
    }

    setLoadingSuggestions(true);

    try {
      const token = localStorage.getItem('token');

      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?input=${encodeURIComponent(input)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (Array.isArray(res.data)) {
        setSuggestions(res.data);
      } else {
        console.warn("Suggestions API did not return an array:", res.data);
        setSuggestions([]);
      }
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setSuggestions([]);
    }

    setLoadingSuggestions(false);
  };


  const handleInputChange = (field, value) => {
    if (field === 'pickup') setPickup(value)
    else setDestination(value)
    setActiveField(field)
    setPanelOpen(true)
    fetchSuggestions(value)
  }


  const handleSuggestionSelect = (suggestion) => {
    if (activeField === 'pickup') setPickup(suggestion)
    else if (activeField === 'destination') setDestination(suggestion)
    setSuggestions([])
    setActiveField(null)
  }

  const submitHandler = (e) => {
    e.preventDefault()
  }

  const fetchFare = async (pickup, destination) => {
    if (!pickup || !destination || pickup.length < 3 || destination.length < 3) {
      setFare({});
      setDistance(null);
      setDuration(null);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare?pickup=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(destination)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      if (res.data && res.data.fare) {
        setFare(res.data.fare);
        setDistance(res.data.distance);
        setDuration(res.data.duration);
      } else {
        setFare({});
        setDistance(null);
        setDuration(null);
      }
    } catch (err) {
      setFare({});
      setDistance(null);
      setDuration(null);
    }
  };

  useEffect(() => {
    if (pickup.length >= 3 && destination.length >= 3) {
      fetchFare(pickup, destination);
    } else {
      setFare({});
    }
  }, [pickup, destination]);

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    console.log('ride created successfully')
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
      <img className='w-16 absolute left-5 top-5' src='../RideX.png'></img>
      <div className='h-screen w-screen'>
        <LiveTracking/>
      </div>
      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full '>
        <div className='h-[30%] p-6 bg-white  relative'>
          <h5 ref={planelCloseRef} onClick={() => {
            setPanelOpen(false)
            setSuggestions([])
            setActiveField(null)
          }}
            className='absolute right-6 top-6 opacity-0 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a  trip</h4>
          <form onSubmit={submitHandler}>
            <div className="line absolute  h-16 w-1 top-[40%] left-10 bg-gray-900 rounded-full"></div>
            <input
              onFocus={() => { setPanelOpen(true); setActiveField('pickup'); fetchSuggestions(pickup); }}
              value={pickup}
              onChange={(e) => handleInputChange('pickup', e.target.value)}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5'
              type="text"
              placeholder='Add a pick-up location' />
            <input
              onFocus={() => { setPanelOpen(true); setActiveField('destination'); fetchSuggestions(destination); }}
              value={destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5'
              type="text"
              placeholder='Enter your destination' />
          </form>
        </div>
        <div ref={panelRef} className='bg-white h-0 '>
          <LocationSearchPanel
            suggestions={suggestions}
            loading={loadingSuggestions}
            onSuggestionSelect={handleSuggestionSelect}
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            activeField={activeField}
            inputValue={activeField === 'pickup' ? pickup : destination}
          />
        </div>
      </div>

      <div ref={vehiclePanelRef} className='w-full fixed z-10  bottom-0  translate-y-full bg-white px-3 py-10 pt-12'>
        <VehiclePanel selectVehicle={setVehicleType} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen} fare={fare} distance={distance} duration={duration} />
      </div>

      <div ref={ConfirmRidePanelRef} className='w-full fixed z-10  bottom-0  translate-y-full bg-white px-3 py-16 pt-12 '>
        <ConfirmRide createRide={createRide} pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>

      <div ref={VehicleFoundRef} className='w-full fixed z-10  bottom-0  translate-y-full bg-white px-3 py-16 pt-12'>
        <LookingForDriver
          createRide={createRide} pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType}

          setVehicleFound={setVehicleFound} />
      </div>

      <div ref={WaitingForDriverRef} className='w-full fixed z-10  bottom-0 translate-y-full  bg-white px-3 py-16 pt-12'>
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          WaitingForDriver={WaitingForDriver}
          setWaitingForDriverPanel={setWaitingForDriverPanel} />
      </div>
    </div>
  )
}

export default Home