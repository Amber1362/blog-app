import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from './index'
import {useForm} from 'react-hook-form'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import Spinner from './Spinner'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const login = async(data) => {
        setIsLoading(true)
        setError('')
        try {
            const session = await authService.login(data)
            if(session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin({
                    $id: userData.$id,
                    name: userData.name,
                    email: userData.email,
                }))
                navigate('/')
            }
        } catch (error) {
           if(error.message.includes('Invalid credentials')) {
            setError('Create an account first.')
           } else {
            setError(error.message)
           }
        } finally {
            setIsLoading(false)
        }
    }
  return (
    <>
    {isLoading && 
    <div className='z-50 cursor-not-allowed fixed inset-0 bg-black/30 flex justify-center items-center'>
            
    </div>
    }

    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
               <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
               </div>

               <h2 className='text-center text-2x1 font-bold leading-light'>
                Sign in to your account
               </h2>
               <p className='mt-2 text-center text-base text-black/60'>
                    Doesn't have an account?
                    <Link
                        to='/signup'
                        className='font-medium text-primary transition-all duration-200 hover:underline'
                    >Sign Up
                    </Link>
               </p>
               {error && <p className='text-red-600 mt-8 text-center font-bold'>{error}</p>}

               <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>

                      <div className='block'>
                        <Input
                        label='Email: '
                        placeholder='Enter your email'
                        type='email'
                        {...register('email', {
                            required: 'Enter your email id.'
                        })}
                        />
                        {errors.email && <p className='text-sm text-red-600 font-bold text-left mb-4 mt-2'>{errors.email.message}</p>}
                      </div>

                      <div className='block'>
                        <Input
                        label='Password: '
                        placeholder='Enter your password'
                        type='password'
                        {...register('password', {
                            required: 'Enter your password',
                            minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters.'
                            },
                            maxLength: {
                                value: 20,
                                message: 'Password must be less then 20 characters'
                            }
                        })}
                        />
                        <Link to='/forgot-password' className='text-blue-500 hover:underline text-sm block text-left'>
                            Forgot password?
                        </Link>
                        {errors.password && <p className='text-sm text-red-600 font-bold text-left mb-4 mt-2'>{errors.password.message}</p>}
                      </div>

                        <Button type='submit' isLoading={isLoading} className='w-full flex justify-center cursor-pointer hover:bg-blue-600'>Sign in</Button>
                    </div>
               </form>
        </div> 
    </div>
    </>
  )
}

export default Login
