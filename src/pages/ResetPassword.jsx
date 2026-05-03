import React, {useState} from 'react'
import { Input, Button, Logo } from '../components'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { useNavigate, useSearchParams } from 'react-router-dom'

function ResetPassword() {
    const {getValues, register, handleSubmit, formState: { errors } } = useForm()
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const [searchParams] = useSearchParams()
    const userId = searchParams.get('userId')
    const secret = searchParams.get('secret')

    const createPassword = async (data) => {
        setError('')
        setIsLoading(true)
        try {
            await authService.updateRecovery({
                userId,
                secret,
                password: data.newPassword
            })
            navigate('/login')
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

        <div className='flex items-center justify-center w-full'>
            <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>

                <h2 className='text-center text-2xl font-bold leading-tight'>
                    Reset your password
                </h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Enter your new password below.
                </p>

                {error && <p className='text-red-600 mt-8 text-center font-bold'>{error}</p>}

                <form onSubmit={handleSubmit(createPassword)} className='mt-8'>
                    <div className='space-y-5'>
                        <div className='block'>
                            <Input
                            label='New password: '
                            placeholder='Enter new password'
                            type='password'
                            className='mb-4'
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
                            {errors.newPassword && <p className='text-sm text-red-600 font-bold text-left mb-4 mt-2'>{errors.newPassword.message}</p>}
                        </div>
                        <div className='block'>
                            <Input
                            label='Confirm password: '
                            placeholder='Enter confirm password'
                            type='password'
                            className='mb-4'
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
                            {errors.confirmPassword && <p className='text-sm text-red-600 font-bold text-left mb-4 mt-2'>{errors.confirmPassword.message}</p>}
                        </div>
                        <Button type='submit' isLoading={isLoading} className='w-full flex justify-center cursor-pointer hover:bg-blue-600'>
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