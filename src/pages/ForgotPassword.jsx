import React, { useState } from 'react'
import { Input, Button, Logo } from '../components'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'

function ForgotPassword() {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: { errors } } = useForm()

    const submit = async (data) => {
        setError('')
        setIsLoading(true)
        const url = `${import.meta.env.VITE_APP_URL}/reset-password`
        console.log('URL:', import.meta.env.VITE_APP_URL)
        try {
            await authService.passwordRecovery({
                email: data.email,
                url
            })
            setSuccess(true)
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
        {/* Loading Overlay */}
        {isLoading && (
            <div className='absolute inset-0 z-50 bg-black/20 backdrop-blur-sm flex justify-center items-center cursor-not-allowed'>
                <Spinner />
            </div>
        )}
        <div className='m-8'>
            <div className='mx-auto w-full max-w-lg bg-white dark:bg-gray-700 dark:border-gray-700 shadow-md rounded-xl p-10 border border-black/10'>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>

                <h2 className='text-center text-2xl font-bold dark:text-gray-200 leading-tight'>
                    Forgot your password?
                </h2>
                <p className='mt-2 text-center text-base dark:text-gray-400 text-black/60'>
                    Remember your password?&nbsp;
                    <Link to='/login' className='font-medium dark:text-gray-300 text-primary transition-all duration-200 hover:underline'>
                        Sign in
                    </Link>
                </p>

                {error && <p className='dark:text-red-400 text-red-600 mt-8 text-center font-bold'>{error}</p>}
                {success && <p className='text-green-600 mt-8 text-center font-bold'>Check your inbox for the recovery email.</p>}

                <form onSubmit={handleSubmit(submit)} className='mt-8'>
                    <div className='space-y-5'>
                        <div className='block'>
                            <Input
                            label='Email: '
                            placeholder='Enter your email'
                            type='email'
                            className='mb-4 shadow-md dark:bg-gray-600 dark:border-gray-600 dark:text-gray-200'
                            {...register('email', { required: 'Email is required.' })}
                            />
                            {errors.email && <p className='text-sm dark:text-red-400 text-red-600 font-bold text-left mb-4 mt-2'>{errors.email.message}</p>}
                        </div>
                        <Button type='submit' isLoading={isLoading} className='w-full shadow-md flex justify-center cursor-pointer bg-indigo-600 hover:bg-indigo-700'>
                            Send recovery email
                        </Button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default ForgotPassword