import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { Container, Button } from '../components'
import { useSelector } from 'react-redux'
import parse from 'html-react-parser'

function Post() {
    const [post, setPost] = useState(null)
    const userData = useSelector((state) => state.auth.userData)
    const navigate = useNavigate()
    const {slug} = useParams();
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        appwriteService.getPost(slug).then((post) => {
            if(post) {
                setPost(post)
            } else {
                navigate('/')
            }
        })
    }, [slug, navigate])

    const isAuthor = post && userData ? post.userId === userData.$id : false

    const deletePost = () => {
        setIsLoading(true)
        appwriteService.deletePost(post.$id).then((status) => {
            if(status) {
                appwriteService.deleteFile(post.featuredImage)
                navigate('/')
                setIsLoading(false)
            }
        })
    }
  
    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3 hover:bg-green-600 cursor-pointer">
                                    Edit
                                </Button>
                            </Link>
                            <Button isLoading={isLoading} bgColor="bg-red-500" className='hover:bg-red-600 cursor-pointer' onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold text-black">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}

export default Post
