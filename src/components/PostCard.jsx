import React from 'react'
import appwriteService from '../appwrite/config'
import {Link} from 'react-router-dom'
import {PostDate} from './index'

function PostCard({$id, title, featuredImage, $createdAt}) {
  return (
    <Link to={`/post/${$id}`}>
       <div className='w-full bg-black rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
            <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl' />
        </div>
        <h2 className='text-xl font-bold text-black'>{title}</h2>
        <PostDate className='text-white' dateString={$createdAt}/>
       </div>
    </Link>
  )
}

export default PostCard