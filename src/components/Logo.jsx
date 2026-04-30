import React from 'react'
import img from '../assets/logo.png'

function Logo({width = '100px'}) {
  return (
    <div>
        <img src={img} width={100}/>
    </div>
  )
}

export default Logo
