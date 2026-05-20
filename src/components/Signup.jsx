import React, {useState} from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const {register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    const create = async(data) => {
        setIsLoading(true)
        setError('')
        try {
            const session = await authService.createAccount(data)
            if(session) {
                toast.success('Account created successfully!')
                navigate('/login')
            }
        } catch (error) {
            if(error.message.includes('Failed to fetch') || 
               error.message.includes('Network')) {
                toast.error('Network error. Please check your internet connection.', {
                    id: 'signup-network-error'
                })
               } else if(error.message.includes('already exists')) {
                    toast.error('Account already exists.')
               } else {
                toast.error('Something went wrong. Please try again.', {
                    id: 'standard-error'
                })
               }
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <>
    {isLoading && 
    <div className='z-50  cursor-not-allowed fixed inset-0 bg-black/30 flex justify-center items-center'>
            
    </div>
    }
    
    <div className='flex items-center justify-center'>
    <div className='mx-auto w-full max-w-lg bg-white dark:bg-gray-700 dark:border-gray-700 rounded-2xl p-10 shadow-lg border border-gray-100'>
        <div className='mb-2 flex justify-center'>
            <span className='inline-block w-full max-w-[100px]'>
                <Logo width='100%' />
            </span>
        </div>
        <h2 className='text-center text-black dark:text-gray-200 text-2xl font-bold'>
            Sign up to create account
        </h2>
        <p className='mt-2 text-center text-sm text-gray-500 dark:text-gray-400'>
            Already have an account?&nbsp;
            <Link
                to='/login'
                className='font-medium text-indigo-600 dark:text-gray-300 transition-all duration-200 hover:underline'
            >Sign In
            </Link>
        </p>

        <form onSubmit={handleSubmit(create)} className='mt-8'>
            <div className='space-y-5'>

              <div className='block'> 
                <Input
                label='Full name: '
                placeholder='Enter your full name'
                className='shadow-sm dark:bg-gray-600 dark:border-gray-600 dark:text-gray-200'
                {...register('name', {
                    required: 'Enter your name.'
                })}
                />
                {errors.name && <p className='text-sm dark:text-red-400 text-red-500 text-left mb-4 mt-2'>{errors.name.message}</p>}
              </div>

              <div className='block'>
                <Input
                label='Email: '
                placeholder='Enter your email'
                type='email'
                className='shadow-sm dark:bg-gray-600 dark:border-gray-600 dark:text-gray-200'
                {...register('email', {
                    required: 'Enter your email id.'
                })}
                />
                {errors.email && <p className='text-sm dark:text-red-400 text-red-500 text-left mb-4 mt-2'>{errors.email.message}</p>}
              </div>

              <div className='block'>
                <div className='relative'>
                <Input
                label='Password: '
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter your password'
                className='shadow-sm dark:bg-gray-600 dark:border-gray-600 dark:text-gray-200'
                {...register('password', {
                    required: 'Enter your password.',
                    minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters.'
                    },
                    maxLength: {
                        value: 20,
                        message: 'Password must be less than 20 characters'
                    }
                })}
                />
                <Button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    bgColor='bg-transparent'
                    textColor='text-indigo-500 dark:text-gray-300 dark:hover:text-gray-400'
                    className='absolute right-3 top-9 text-sm hover:text-indigo-700'
                >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </Button>
                </div>
                {errors.password && <p className='text-sm dark:text-red-400 text-red-500 text-left mb-4 mt-2'>{errors.password.message}</p>}
              </div>

                <Button type='submit' isLoading={isLoading} className='w-full flex justify-center cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white'>Create account</Button>
            </div>
        </form>
    </div>
</div>
    </>
  )

}

export default Signup
