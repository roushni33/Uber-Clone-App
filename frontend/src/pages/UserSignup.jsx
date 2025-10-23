import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'


const UserSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')


  const { user, setUser } = React.useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {

      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      password: password,
      email: email

    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

    if (response.status === 201) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10 ' src='../RideX.png'></img>
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>

          <h3 className='text-lg font-medium mb-2'>What's your name</h3>
          <div className='flex gap-4 mb-6'>
            <input
              required
              className='bg-[#eeeeee] w-1/2  rounded px-4 py-2 border text-lg placeholder:text-base '
              type='text'
              placeholder='First name'
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
            />

            <input
              required
              className='bg-[#eeeeee] w-1/2  rounded px-4 py-2 border  text-lg placeholder:text-base '
              type='text'
              placeholder='Last name'
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
              }}
            />
          </div>



          <h3 className='text-lg font-medium mb-2'>What's your email</h3>

          <input
            required
            className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
            type='email'
            placeholder='example@gmail.com'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
          <h3 className='text-lg font-medium  mb-2'>Enter Password</h3>

          <input
            required
            className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
            type='password'
            placeholder='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}

          />

          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base '>
            Create Account
          </button>
        </form>
        <p className='text-center'> Already have a account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
      </div>

      <div>
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
    </div>
  )
}

export default UserSignup