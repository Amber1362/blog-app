import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-500',
    textColor = 'text-white',
    className = '',
    isLoading,
    ...props // <- catches everything else
}) {
  return (
   <button 
   type={type}
   disabled={isLoading}
   className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
   {...props}
   >
    {isLoading ? 'Loading...' : children}
   </button>
  )
}

export default Button

