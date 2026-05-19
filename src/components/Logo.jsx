import React from 'react'
// import img from '../assets/logo.png'
import logo from '../assets/newVellaLogo.png'
import darkModeLogo from '../assets/VellaDarkModeLogo.png'
import { useSelector } from 'react-redux'

function Logo({width = '100px'}) {
  const theme = useSelector((state) => state.theme.mode)
  return (
    <div>
        <img src={theme === 'dark' ? darkModeLogo : logo} width={100}/>
    </div>
  )
}

export default Logo
