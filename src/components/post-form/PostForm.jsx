import React, {useCallback, useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, Select, RTE} from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Spinner from '../Spinner'

function PostForm({post}) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    const {register, handleSubmit, watch, setValue, getValues, control, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active'
        }
    })

    const submit = async (data) => {
        setIsLoading(true)
        try {
            if(post) {
        const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

        if(file) {
            appwriteService.deleteFile(post.featuredImage);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
            ...data,
            featuredImage: file ? file.$id : undefined
        })

        if(dbPost) {
            setIsLoading(false)
            navigate(`/post/${dbPost.$id}`)
        }
    } else {
        setIsLoading(true)
        const file = await appwriteService.uploadFile(data.image[0])

        if(file) {
            const fileId = file.$id
            data.featuredImage = fileId
            const dbPost = await appwriteService.createPost({...data, userId: userData.$id})

            if(dbPost) {
                setIsLoading(false)
            navigate(`/post/${dbPost.$id}`)
        }
        }
    }

        } catch (error) {
            if(error.message.includes('already exists')) {
            setError('This slug is already taken. Please use a different one.')
        } else {
            setError(error.message)
        }
        } finally {
            setIsLoading(false)
        }
    }
       

    const slugTransform = useCallback((value) => {
        if(value && typeof value === 'string') {
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, '-')
            .replace(/\s/g, '-')
        }
        return ''
    }, [])

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if(name === 'title') {
                setValue('slug', slugTransform(value.title), {shouldValidate: true})
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [slugTransform, watch, setValue])

    return (
        <>
        {isLoading && (
            <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center cursor-not-allowed">
                <Spinner />
            </div>
        )}

        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
              <div className='block'>
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: 'Title is required.' })}
                />
                {errors.title && <p className='text-sm text-red-600 font-bold text-left mb-4'>{errors.title.message}</p>}
              </div>

              <div className='block'>
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-2"
                    {...register("slug", { required: 'Slug is required.' })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                {errors.slug && <p className='text-sm text-red-600 font-bold text-left mb-4'>{errors.slug.message}</p>}
                {error && <p className='text-red-600 mt-8 text-left mb-4 font-bold text-sm'>{error}</p>}
              </div>

                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>

            <div className="w-1/3 px-2">
              <div className='block'>
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post ? 'Upload the image.' : false })}
                />
                {errors.image && <p className='text-sm text-red-600 font-bold text-left mb-4'>{errors.image.message}</p>}
              </div>

                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    isLoading={isLoading}
                    type="submit"
                    bgColor={post ? "bg-green-500" : "bg-blue-500"}
                    className="w-full cursor-pointer hover:bg-blue-600 flex items-center justify-center"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
        </>
    )
}


export default PostForm
