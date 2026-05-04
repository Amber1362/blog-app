import React, { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import Spinner from '../components/Spinner'

function AllPosts() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    appwriteService.getPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })

  }, [])

  return (
    <div className='relative w-full min-h-screen py-10 bg-gray-200'>

      {/* Loading Overlay */}
      {isLoading && (
        <div className='absolute inset-0 z-50 bg-black/20 backdrop-blur-sm flex justify-center items-center cursor-not-allowed'>
          <Spinner />
        </div>
      )}

      <Container>

        {/* Page Heading */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-800'>
            All Posts
          </h1>
          <p className='text-gray-500 mt-1'>
            Explore published stories and ideas
          </p>
        </div>

        {/* Posts Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {posts.map((post) => (
            <PostCard
              key={post.$id}
              $id={post.$id}
              title={post.title}
              featuredImage={post.featuredImage}
              $createdAt={post.$createdAt}
            />
          ))}
        </div>

      </Container>
    </div>
  )
}

export default AllPosts