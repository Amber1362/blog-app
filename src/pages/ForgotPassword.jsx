import React, { useState } from 'react'
import { Input, Button, Logo } from '../components'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { Link } from 'react-router-dom'

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
        {isLoading && 
        <div className='z-50 cursor-not-allowed fixed inset-0 bg-black/30 flex justify-center items-center'></div>
        }

        <div className='m-8'>
            <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>

                <h2 className='text-center text-2xl font-bold leading-tight'>
                    Forgot your password?
                </h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Remember your password?&nbsp;
                    <Link to='/login' className='font-medium text-primary transition-all duration-200 hover:underline'>
                        Sign in
                    </Link>
                </p>

                {error && <p className='text-red-600 mt-8 text-center font-bold'>{error}</p>}
                {success && <p className='text-green-600 mt-8 text-center font-bold'>Check your inbox for the recovery email.</p>}

                <form onSubmit={handleSubmit(submit)} className='mt-8'>
                    <div className='space-y-5'>
                        <div className='block'>
                            <Input
                            label='Email: '
                            placeholder='Enter your email'
                            type='email'
                            className='mb-4'
                            {...register('email', { required: 'Email is required.' })}
                            />
                            {errors.email && <p className='text-sm text-red-600 font-bold text-left mb-4 mt-2'>{errors.email.message}</p>}
                        </div>
                        <Button type='submit' isLoading={isLoading} className='w-full flex justify-center cursor-pointer hover:bg-blue-600'>
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