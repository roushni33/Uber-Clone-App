import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainProtectedWraper = ({ children }) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { setCaptain, isLoading, setIsLoading } = useContext(CaptainDataContext)
  // const [ isLoading , setIsLoading ] = useState(true)

  useEffect(() => {
    if (!token) {
      navigate('/captain-login')
      return;
    }
    setIsLoading(true)
    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (response.status === 200) {
          setCaptain(response.data)
          setIsLoading(false)
        }
      })
      .catch(err => {
        console.log(err)
        localStorage.removeItem('token')
        setIsLoading(false)
        navigate('/captain-login')
      })
  }, [token, navigate, setCaptain])

  if (isLoading) {
    return <div>Loading...</div>
  }
  return <>{children}</>
}

export default CaptainProtectedWraper