import React from 'react'
// import img from '../assets/logo.png'
import logo from '../assets/newVellaLogo.png'

function Logo({width = '100px'}) {
  return (
    <div>
        <img src={logo} width={100}/>
    </div>
  )
}

export default Logo
