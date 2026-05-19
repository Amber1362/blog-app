import React from 'react'
import Spinner from './Spinner'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-indigo-600',
    textColor = 'text-white',
    className = '',
    isLoading,
    ...props // <- catches everything else
}) {
  return (
   <button 
   type={type}
   disabled={isLoading}
   className={`px-4 py-2 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 ${bgColor} ${textColor} ${className}`}
   {...props}
   >
    {isLoading ? <Spinner /> : children}
   </button>
  )
}

export default Button