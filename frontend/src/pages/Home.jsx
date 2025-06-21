import React from 'react'
import {Link} from 'react-router-dom'
const Home = () => {
  return (
    <div >
      <div className='bg-cover bg-center bg-[url(https://plus.unsplash.com/premium_photo-1684450177717-0213576b3f12?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHRyYWZmaWMlMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D)] h-screen pt-8  w-full bg-red-400 flex justify-between flex-col'>
        <img className='w-16 ml-8' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png'></img>
          <div className='bg-white pb-7 py-4 px-4'>
            <h2 className='text-[30px] font-bold'>Get Started with Uber</h2>
            <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
          </div>
      </div>

    </div>
  )
}

export default Home