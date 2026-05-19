import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import  authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import Spinner from '../Spinner';
import { useNavigate } from 'react-router-dom';
import {Popup} from '../index'

function LogoutBtn() {
   const dispatch = useDispatch();
   const [popup, setPopup] = useState(false)
   const [isLoading, setIsLoading] = useState(false)
   const navigate = useNavigate()

   const logoutHandler = () => {
    setPopup(true)
   }

  return (
  <>
  {popup && <Popup
      para='Are you sure you want to logout?'
      onConfirm={() => {
        setIsLoading(true)
        authService.logout()
        .then(() => {
          dispatch(logout())
          navigate('/')
        })
        .finally(() => {
          setIsLoading(false)
          setPopup(false)
        })
      }}

      onCancel={() => {
        setPopup(false)
      }}
  />}

  {isLoading && 
    <div className='z-50 cursor-not-allowed fixed inset-0 bg-black/30 flex justify-center items-center'>
            <Spinner />
    </div>
  }

    <div>
      <button disabled={isLoading} className='disabled:cursor-not-allowed disabled:opacity-50 inline-block px-6 py-2 duration-200 text-black dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-600 rounded-full font-bold hover:text-indigo-600 cursor-pointer' onClick={logoutHandler}>{isLoading ? <Spinner /> : 'Logout'}</button>
    </div>

  </>
  )
}

export default LogoutBtn
