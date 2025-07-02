import React from 'react'

const RidePopUp = (props) => {
    return (
        <div>
            <h5 onClick={() => {
                props.setRidePopupPanel(false)
            }}
                className='p-1 text-center w-[93%] absolute top-0 '><i className="ri-arrow-down-wide-line text-3xl text-gray-200 pt-14"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>
            <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4 '>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 w-12 object-cover rounded-full' src='https://randomuser.me/api/portraits/women/90.jpg' />
                    <h2 className='text-xl font-semibold'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 kM</h5>
            </div>
            <div className='flex flex-col gap-2 justify-between items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div className=''>
                            <h3 className='font-medium text-lg'>562/11-A</h3>
                            <p className='text-gray-600 text-sm -mt-1'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-2-fill text-lg"></i>
                        <div className=''>
                            <h3 className='font-medium text-lg'>562/11-A</h3>
                            <p className='text-gray-600 text-sm -mt-1'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 '>
                        <i className="ri-currency-line"></i>
                        <div className=''>
                            <h3 className='font-medium text-lg'>₹{Math.round(props.ride?.fare)}</h3>
                            <p className='text-gray-600 text-sm -mt-1'>Cash Cash</p>
                        </div>
                    </div>
                </div>
                <div className='flex w-full items-center justify-between mt-5 '>
                    <button onClick={() => {
                        props.setRidePopupPanel(false)

                    }}
                        className=' mt-1 bg-gray-300 text-gray-700 font-semibold p-3 px-10 rounded-lg'>
                        Ignore
                    </button>

                    <button onClick={() => {
                        props.confirmRide(); 
                        props.setConfirmRidePopupPanel(true); 
                        props.setRidePopupPanel(false);
                    }}
                        className='  bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>
                        Accept
                    </button>


                </div>
            </div>
        </div>
    )
}

export default RidePopUp