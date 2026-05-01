import React, {useState, useEffect} from 'react'
import appwriteService from '../appwrite/config'
import {Container, PostCard} from '../components'

function Home() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        setIsLoading(true)
        appwriteService.getPosts()
        .then((posts) => {
            if(posts) {
                setPosts(posts.documents)
            }
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [])

    if(posts.length === 0) {
        return <Container>
            <div className='flex flex-wrap'>
                <div className='p-2 w-full'>
                    <h1 className='text-2xl font-bold hover:text-gray-500'>
                        Login to read posts
                    </h1>
                </div>
            </div>
       </Container>
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        console.log('post: ', post),
                        <div className='p-2 w-1/4' key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
