import React from 'react'

const LookingForDriver = (props) => {
  return (
    <div>
            <h5 onClick={() => {
                props.setVehicleFound(false)
            }} className='p-1 text-center w-[93%] absolute top-0 '><i className="ri-arrow-down-wide-line text-3xl text-gray-200 pt-14"></i></h5>
            <h3 className='text-2xl font-semibold mb-3'>Looking for  nearby Driver</h3>
            <div className='flex flex-col gap-2 justify-between items-center'>
                <img className='h-20' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png' />
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
               
            </div>

        </div>
  )
}

export default LookingForDriver