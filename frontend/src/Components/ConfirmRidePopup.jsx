import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const ConfirmRidePopup = (props) => {
    const [otp, setOtp] = useState("")
    const submitHandler = (e) => {
        e.preventDefault()
    }
    return (
        <div >
            <h5 onClick={() => {

            }}
                className='p-1 text-center w-[93%] absolute top-0 '><i className="ri-arrow-down-wide-line text-3xl text-gray-200 pt-14"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to start</h3>
            <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4 '>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 w-12 object-cover rounded-full' src='https://randomuser.me/api/portraits/women/90.jpg' />
                    <h2 className='text-xl font-semibold'>Roushni</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 kM</h5>
            </div>
            <div className='flex flex-col gap-2 justify-between items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div className=''>
                            <h3 className='font-medium text-lg'>562/11-A</h3>
                            <p className='text-gray-600 text-sm -mt-1'>Kankariya Talab,Ahmedabad</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-2-fill text-lg"></i>
                        <div className=''>
                            <h3 className='font-medium text-lg'>562/11-A</h3>
                            <p className='text-gray-600 text-sm -mt-1'>Kankariya Talab,Ahmedabad</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 '>
                        <i className="ri-currency-line"></i>
                        <div className=''>
                            <h3 className='font-medium text-lg'>₹200.10</h3>
                            <p className='text-gray-600 text-sm -mt-1'>Cash Cash</p>
                        </div>
                    </div>
                </div>

                <div className='mt-6 w-full'>
                    <form onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        <input 

                        value={otp}
                        
                        onChange={(e) => {
                            setOtp(e.target.value)
                        }}
                            type='text'
                            className='bg-[#eee] px-6 py-4 font-mono text-base rounded-lg w-full mt-5'
                            placeholder='Enter OTP'
                        />
                        <Link to='/captain-riding'
                            className='w-full mt-5 bg-green-600 text-lg text-white flex justify-center font-semibold p-3 rounded-lg'>
                            Confirm
                        </Link>

                        <button onClick={() => {
                            props.setConfirmRidePopupPanel(false)
                            props.setRidePopupPanel(false)
                        }}
                            className='w-full mt-1 text-lg bg-red-600 text-white font-semibold p-3 rounded-lg'>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopup