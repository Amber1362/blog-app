import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'
import { PostDate } from './index'

function PostCard({ $id, title, featuredImage, $createdAt }) {
  return (
    <Link to={`/post/${$id}`} className='h-full'>
      <div className='w-full bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:bg-gray-600 dark:border-gray-600'>
        
        {/* Image */}
        <div className='w-full flex justify-center mb-4'>
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className='rounded-xl w-full object-cover h-48'
          />
        </div>

        {/* Title */}
        <h2 className='text-xl font-bold text-gray-800 mb-2 line-clamp-2 dark:text-white'>
          {title}
        </h2>

        {/* Date */}
        <div className='mt-3'>
          <PostDate
            className='text-sm text-gray-500 font-medium dark:text-gray-400'
            dateString={$createdAt}
          />
        </div>

      </div>
    </Link>
  )
}

export default PostCard