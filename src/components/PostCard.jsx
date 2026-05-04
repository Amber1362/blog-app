import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'
import { PostDate } from './index'

function PostCard({ $id, title, featuredImage, $createdAt }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100'>
        
        {/* Image */}
        <div className='w-full flex justify-center mb-4'>
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className='rounded-xl w-full object-cover'
          />
        </div>

        {/* Title */}
        <h2 className='text-xl font-bold text-gray-800 mb-2 line-clamp-2'>
          {title}
        </h2>

        {/* Date */}
        <div className='mt-3'>
          <PostDate
            className='text-sm text-gray-500 font-medium'
            dateString={$createdAt}
          />
        </div>

      </div>
    </Link>
  )
}

export default PostCard