import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
         <h5 onClick={() => {
         props.setVehiclePanelOpen(false)
        }} className='p-1 text-center w-[93%] absolute top-0 '><i className="ri-arrow-down-wide-line text-3xl text-gray-200 pt-14"></i></h5>
        <h3 className='text-2xl font-semibold mb-3'>Choose a Vehicle</h3>
        <div onClick={() => {
          props.setConfirmRidePanel(true)
        }} className='flex w-full mb-2 p-3 items-center justify-between border-2 active:border-black  rounded-xl  '>
          <img className='h-12 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
          <div className=' w-1/2 ml-2'>
            <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable compact rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹200.10</h2>
        </div>

        <div onClick={() => {
          props.setConfirmedRidePanel(true)
         }} className='flex w-full mb-2 p-3 items-center justify-between border-2 active:border-black rounded-xl  '>
          <img className='h-12 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
          <div className=' w-1/2 -ml-2'>
            <h4 className='font-medium text-base'>Moto<span><i className="ri-user-3-fill"></i>1</span></h4>
            <h5 className='font-medium text-sm'>3 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable Motarcycle rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹65</h2>
        </div>

        <div onClick={() => {
          props.setConfirmedRidePanel(true)
        }} className='flex w-full mb-2 p-3 items-center justify-between border-2 active:border-black rounded-xl  '>
          <img className='h-12 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
          <div className=' w-1/2 ml-2'>
            <h4 className='font-medium text-base'>UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
            <h5 className='font-medium text-sm'>5 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable Auto rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹118.21</h2>
        </div>
    </div>
  )
}

export default VehiclePanel