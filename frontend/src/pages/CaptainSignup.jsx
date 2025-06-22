import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    const userData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      password,
      email,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, userData)

    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }


    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }

  return (
    <div className='h-screen flex flex-col justify-between px-4 py-3'>
      <div className='flex-1 flex flex-col justify-start'>
        <img className='w-16 mb-3' src='https://www.svgrepo.com/show/505031/uber-driver.svg' alt='Uber' />

        <form className='w-full max-w-md mx-auto' onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>Captain's Name</h3>
          <div className='flex gap-4 mb-4'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded px-3 py-2 border text-base'
              type='text'
              placeholder='First name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded px-3 py-2 border text-base'
              type='text'
              placeholder='Last name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <h3 className='text-lg font-medium mb-2'>Captain's Email</h3>
          <input
            required
            className='bg-[#eeeeee] mb-4 rounded px-3 py-2 border w-full text-base'
            type='email'
            placeholder='example@gmail.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className='text-lg font-medium mb-2'>Password</h3>
          <input
            required
            className='bg-[#eeeeee] mb-4 rounded px-3 py-2 border w-full text-base'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <h3 className='text-lg font-medium mb-2'>Vehicle Info</h3>
          <div className='flex gap-4 mb-4'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded px-3 py-2 border text-base'
              type='text'
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded px-3 py-2 border text-base'
              type='text'
              placeholder='Plate Number'
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
            />
          </div>

          <div className='flex gap-4 mb-4'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded px-3 py-2 border text-base'
              type='number'
              placeholder='Capacity'
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded px-3 py-2 border text-base'
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value=''>Vehicle Type</option>
              <option value='Car'>Car</option>
              <option value='Auto'>Auto</option>
              <option value='Bike'>Bike</option>
            </select>
          </div>

          <button className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 w-full text-base'>
            Create Captain Account
          </button>

          <p className='text-center text-sm'>
            Already have an account? <Link to='/captain-login' className='text-blue-600'>Login here</Link>
          </p>
        </form>
      </div>

      <p className='text-xs text-gray-500 leading-snug text-center mt-4'>
        This site is protected by reCAPTCHA and the{' '}
        <span className='underline hover:text-blue-600 transition-colors duration-200 cursor-pointer'>
          Google Privacy Policy
        </span>{' '}
        and{' '}
        <span className='underline hover:text-blue-600 transition-colors duration-200 cursor-pointer'>
          Terms of Service
        </span>.
      </p>
    </div>
  )
}

export default CaptainSignup
