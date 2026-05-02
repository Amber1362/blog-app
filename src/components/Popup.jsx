import React from 'react'
import { Button } from './index'

function Popup({ para, onConfirm, onCancel }) {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-100 bg-black/40'>
      <div className='w-full max-w-sm bg-white p-6 rounded-xl shadow-lg'>
        <p className='text-center'>{para}</p>

        <div className='flex justify-center gap-4 mt-4'>
            <Button onClick={onCancel} className='hover:bg-blue-600 cursor-pointer'>No</Button>
            <Button onClick={onConfirm} className='hover:bg-blue-600 cursor-pointer'>Yes</Button>
        </div>
      </div>
    </div>
  )
}

export default Popup