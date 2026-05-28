import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import { AuthLayout } from './components/index.js'
import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import AllPosts from "./pages/AllPosts";
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import {PrivacyPolicy, TermsAndConditions} from './components/index.js'
import Profile from './pages/Profile.jsx'
import ProfileSetup from './pages/ProfileSetup.jsx'
import 'react-loading-skeleton/dist/skeleton.css'
import EditProfile from './pages/EditProfile.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
       <Route path='/privacy-policy' element={<PrivacyPolicy />} />
       <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
       <Route index element={<Home />}/>
       <Route path='/login' element={<AuthLayout authentication={false}><Login /></AuthLayout>}/>
       <Route path='/signup' element={<AuthLayout authentication={false}><Signup /></AuthLayout>}/>
       <Route path='/all-posts' element={<AllPosts />}/>
       <Route path='/add-post' element={<AuthLayout authentication={true}><AddPost /></AuthLayout>}/>
       <Route path='/edit-post/:slug' element={<AuthLayout authentication={true}><EditPost /></AuthLayout>}/>
       <Route path='/post/:slug' element={<Post />}/>
       <Route path='/forgot-password' element={<AuthLayout authentication={false}><ForgotPassword /></AuthLayout>}/>
       <Route path='/reset-password' element={<AuthLayout authentication={false}><ResetPassword /></AuthLayout>}/>
       <Route path='/profile/:username' element={<Profile />} />
       <Route path='/profile-setup' element={<AuthLayout authentication={true}><ProfileSetup /></AuthLayout>}/>
       <Route path="/edit-profile" element={<AuthLayout authentication={true}><EditProfile /></AuthLayout>} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </StrictMode>,
)
