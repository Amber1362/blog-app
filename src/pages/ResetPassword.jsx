import React, {useState} from 'react'
import { Input, Button, Logo } from '../components'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import toast from 'react-hot-toast'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

function ResetPassword() {
    const {getValues, register, handleSubmit, formState: { errors } } = useForm()
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [searchParams] = useSearchParams()
    const userId = searchParams.get('userId')
    const secret = searchParams.get('secret')

    const createPassword = async (data) => {
        setIsLoading(true)
        try {
            await authService.updateRecovery({
                userId,
                secret,
                password: data.newPassword
            })
            toast.success('Password updated successfully.')
            navigate('/login')
        } catch (error) {
            if(error.message.includes('Failed to fetch') || 
               error.message.includes('Network')) {
                toast.error('Network error. Please check your internet connection.', {
                    id: 'password-network-error'
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
        {/* Loading Overlay */}
        {isLoading && (
            <div className='absolute inset-0 z-50 bg-black/20 backdrop-blur-sm flex justify-center items-center cursor-not-allowed'>
                <Spinner />
            </div>
        )}

        <div className='flex items-center justify-center w-full my-8'>
            <div className='mx-auto w-full max-w-lg bg-white dark:bg-gray-700 dark:border-gray-700 rounded-2xl p-10 border border-black/10 shadow-md'>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>

                <h2 className='text-center text-2xl font-bold dark:text-gray-200 leading-tight'>
                    Reset your password
                </h2>
                <p className='mt-2 text-center text-base dark:text-gray-400 text-black/60'>
                    Enter your new password below.
                </p>

                <form onSubmit={handleSubmit(createPassword)} className='mt-8'>
                    <div className='space-y-5'>
                        <div className='block'>
                            <div className='relative'>
                            <Input
                            label='New password: '
                            placeholder='Enter new password'
                            type={showPassword ? 'text' : 'password'}
                            className='mb-4 shadow-md dark:bg-gray-600 dark:border-gray-600 dark:text-gray-200'
                            {...register('newPassword', { required: 'Enter new password.' ,
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
                            {errors.newPassword && <p className='text-sm dark:text-red-400 text-red-600 font-bold text-left mb-4 mt-2'>{errors.newPassword.message}</p>}
                        </div>

                        <div className='block'>
                            <div className='relative'>
                            <Input
                            label='Confirm password: '
                            placeholder='Enter confirm password'
                            type={showPassword ? 'text' : 'password'}
                            className='mb-4 shadow-md dark:bg-gray-600 dark:border-gray-600 dark:text-gray-200'
                            {...register('confirmPassword', {
                                required: 'Please confirm your password.',
                                validate: (value) => value === getValues('newPassword') || 'Passwords do not match.',
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
                            {errors.confirmPassword && <p className='text-sm dark:text-red-400 text-red-600 font-bold text-left mb-4 mt-2'>{errors.confirmPassword.message}</p>}
                        </div>
                        <Button type='submit' isLoading={isLoading} className='w-full flex justify-center cursor-pointer hover:bg-indigo-700 shadow-md'>
                            Reset password
                        </Button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default ResetPassword