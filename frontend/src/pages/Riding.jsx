import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../Components/LiveTracking'
const Riding = () => {
    const location = useLocation()
    const { ride } = location.state || {}
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate();

    useEffect(() => {
        socket.on("ride-ended", (ride) => {
            console.log('Ride ended: ', ride)
            navigate('/home')
        })
    }, [socket, navigate])

    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed  right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-home-4-line"></i>
            </Link>
            <div className='h-1/2 '>
                <LiveTracking/>
            </div>
            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between '>

                    <div className='relative flex items-center w-24 h-14 '>
                        <img
                            className='h-14 w-14 rounded-full border-2 border-gray-300 object-cover z-20 shadow-lg'
                            src='https://randomuser.me/api/portraits/men/32.jpg'
                            alt='Driver'
                        />
                        <img
                            className='h-12 w-12 rounded-full border-2 border-white object-cover absolute left-10 top-1 z-10'
                            src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png'
                            alt='Car'
                        />
                    </div>


                    <div className='text-right '>
                        <h2 className='text-lg font-medium capitalize '>{ride?.captain.fullname.firstname}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1 '>{ride?.captain.vehicle.plate}</h4>
                        <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                    </div>
                </div>
                <div className='flex flex-col gap-2 justify-between items-center'>
                    <div className='w-full mt-5'>
                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="ri-map-pin-2-fill text-lg"></i>
                            <div className=''>
                                <h3 className='font-medium text-lg'>562/11-A</h3>
                                <p className='text-gray-600 text-sm -mt-1'>{ride?.destination}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3 '>
                            <i className="ri-currency-line"></i>
                            <div className=''>
                                <h3 className='font-medium text-lg'>₹{Math.round(ride?.fare)}</h3>
                                <p className='text-gray-600 text-sm -mt-1'>Cash Cash</p>
                            </div>
                        </div>
                    </div>

                </div>
                <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding
