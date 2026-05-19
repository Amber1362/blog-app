import { useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import authService from './appwrite/auth'
import { useEffect } from 'react'
import { login, logout } from './store/authSlice'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import {Outlet} from 'react-router-dom'

function App() {
 const [isLoading, setIsLoading] = useState(true);
 const dispatch = useDispatch();
 const theme = useSelector((state) => state.theme.mode)

 useEffect(() => {
     authService.getCurrentUser()
     .then((userData) => {
      if(userData) {
        dispatch(login({userData: {
           $id: userData.$id,
                name: userData.name,
                email: userData.email,
        }}))
      } else {
        dispatch(logout())
      }
     })
     .finally(() => setIsLoading(false))
 }, [])

 useEffect(() => {
     const root = document.body;

     if(theme === 'dark') {
      root.classList.remove('light')
      root.classList.add('dark')
     } else {
      root.classList.remove('dark')
      root.classList.add('light')
     }
 }, [theme])

  return !isLoading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-200 dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
