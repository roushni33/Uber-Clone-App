import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'

const Captainlogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      password: password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData)

    if (response.status === 200) {
      const data = response.data
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }
    setEmail('')
    setPassword('')

  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-3 ' src='https://www.svgrepo.com/show/505031/uber-driver.svg'></img>
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>

          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full tex-lg placeholder:text-base '
            type='email'
            placeholder='example@gmail.com'
          />
          <h3 className='text-lg font-medium  mb-2'>Enter Password</h3>

          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full tex-lg placeholder:text-base '
            type='password'
            placeholder='password'
          />

          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full tex-lg placeholder:text-base '>
            Login
          </button>
        </form>
        <p className='text-center'> join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
      </div>

      <div>
        <Link to='/login' className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2  w-full tex-lg placeholder:text-base '>Sign in as User</Link>
      </div>
    </div>
  )
}

export default Captainlogin