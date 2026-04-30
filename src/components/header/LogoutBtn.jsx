import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import  authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
   const dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(false)

   const logoutHandler = () => {
    setIsLoading(true)
    authService.logout()
    .then(() => {dispatch(logout())})
    .finally(() => {
      setIsLoading(false)
    })
   }

  return (
    <div>
      <button disabled={isLoading} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>{isLoading ? 'loading...' : 'Logout'}</button>
    </div>
  )
}

export default LogoutBtn
