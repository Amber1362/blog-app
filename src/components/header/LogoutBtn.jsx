import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import  authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import Spinner from '../Spinner';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
   const dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(false)
   const navigate = useNavigate()

   const logoutHandler = () => {
    setIsLoading(true)
    authService.logout()
    .then(() => {
      dispatch(logout())
      navigate('/')
    })
    .finally(() => {
      setIsLoading(false)
    })
   }

  return (
  <>
  {isLoading && 
    <div className='z-50 cursor-not-allowed fixed inset-0 bg-black/30 flex justify-center items-center'>
            <Spinner />
    </div>
  }

    <div>
      <button disabled={isLoading} className='disabled:cursor-not-allowed disabled:opacity-50 inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>{isLoading ? <Spinner /> : 'Logout'}</button>
    </div>

  </>
  )
}

export default LogoutBtn
