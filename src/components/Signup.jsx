import React, {useState} from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const {register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false)

    const create = async(data) => {
        setIsLoading(true)
        setError('')
        try {
            const session = await authService.createAccount(data)
            if(session) {
                // const userData = await authService.getCurrentUser()
                // if(userData) dispatch(login(userData))
                navigate('/login')
            }
        } catch (error) {
            setError(error.message)
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
    <div className='flex items-center justify-center '>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
             <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100%' />
                </span>
             </div>
             <h2 className='text-center text-2x1 font-bold leading-light'>
                Sign up to create account
             </h2>
             <p className='mt-2 text-center text-base text-black/60'>
                Already have an account?
                <Link
                    to='/login'
                    className='font-medium text-primary transition-all duration-200 hover:underline'
                >Sign In
                </Link>
             </p>

             <form onSubmit={handleSubmit(create)}>
                <div className='space-y-5'>

                  <div className='block'> 
                    <Input
                    label='Full name: '
                    placeholder='Enter your full name'
                    {...register('name', {
                        required: true ? 'Enter your name.' : false
                    })}
                    />
                    {errors.name && <p className='text-sm text-red-600 font-bold text-left mb-4 mt-2'>{errors.name.message}</p>}
                  </div>

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
                    {...register('password', {
                        required: 'Enter your password.',
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
                    {errors.password && <p className='text-sm text-red-600 font-bold text-left mb-4 mt-2'>{errors.password.message}</p>}
                  </div>

                    <Button type='submit' isLoading={isLoading} className='w-full flex justify-center cursor-pointer hover:bg-blue-600'>Create account</Button>
                </div>
             </form>
        </div>
    </div>
    </>
  )

}

export default Signup
