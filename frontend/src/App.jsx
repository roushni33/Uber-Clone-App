import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserSignup from './pages/userSignup'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import UserProtectedWraper from './pages/UserProtectedWraper'
import UserLogin from './pages/UserLogin'
import UserLogout from './pages/UserLogout'
import CaptainLogout from './pages/CaptainLogout'
import CaptainProtectedWraper from './pages/CaptainProtectedWraper'
import CaptainHome from './pages/CaptainHome'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
import 'remixicon/fonts/remixicon.css'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path = '/captain-login' element={<Captainlogin/>}/>
        <Route path = '/captain-riding' element={<CaptainRiding/>}/>
        <Route path = '/captain-signup' element={<CaptainSignup/>}/>
        <Route path = '/home' element={<UserProtectedWraper><Home/></UserProtectedWraper>}/>
        <Route path='/user/logout' element={<UserProtectedWraper><UserLogout/></UserProtectedWraper>}/>
        <Route path='/captain-home' element={<CaptainProtectedWraper><CaptainHome/></CaptainProtectedWraper>}/>
        <Route path='/captain/logout' element={<CaptainProtectedWraper><CaptainLogout/></CaptainProtectedWraper>}/>
      </Routes>
    </div>
  )
}

export default App