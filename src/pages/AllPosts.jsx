import React, {useState, useEffect} from 'react'
import appwriteService from '../appwrite/config'
import {Container, PostCard} from '../components'
import Spinner from '../components/Spinner'

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        setIsLoading(true)
        appwriteService.getPosts([])
        .then((posts) => {
            if(posts) {
                setPosts(posts.documents)
            }
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [])
  return (
    <>
    <div className='relative w-full py-8'>
    {isLoading && 
    <div className='z-50 absolute inset-0 bg-black/30 flex justify-center items-center cursor-not-allowed'>
        <Spinner />    
    </div>}

    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard
                            $id={post.$id}
                            title={post.title}
                            featuredImage={post.featuredImage}
                            $createdAt={post.$createdAt}
                        />
                    </div>
                ))}
            </div>
        </Container>
    </div>
    </div>

    </>
  )
}

export default AllPosts
