import React from 'react'
import { Button, Logo } from './index'

function Popup({ para, onConfirm, onCancel }) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'>
      <div className='w-full max-w-sm bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl'>
        {/* Logo */}
        <div className='mb-4 flex justify-center'>
          <span className='inline-flex items-center justify-center h-12'>
            <Logo width='100%' />
          </span>
        </div>
        <p className='text-center text-gray-700 dark:text-gray-200 font-medium'>
          {para}
        </p>
        <div className='flex justify-center gap-4 mt-6'>
          <Button
            onClick={onCancel}
            className='hover:bg-indigo-700 cursor-pointer'>
            No
          </Button>
          <Button
            onClick={onConfirm}
            className='hover:bg-indigo-700 cursor-pointer'>
            Yes
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Popup