import React from 'react'
import {Link} from 'react-router-dom'
const Start = () => {
  return (
    <div >
      <div className='bg-cover bg-center bg-[url(../bg.png)] h-screen pt-8  w-full bg-red-400 flex justify-between flex-col'>
        <img className='w-16 ml-8' src='../RideX.png'></img>
          <div className='bg-white pb-7 py-4 px-4'>
            <h2 className='text-[30px] font-bold'>Get Started with RideX</h2>
            <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
          </div>
      </div>

    </div>
  )
}

export default Start