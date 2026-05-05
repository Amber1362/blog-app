import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { Container, Button, Popup, PostDate } from '../components'
import { useSelector } from 'react-redux'
import parse from 'html-react-parser'
import Spinner from '../components/Spinner'

function Post() {
  const [post, setPost] = useState(null)
  const [popup, setPopup] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [spinner, setSpinner] = useState(false)

  const userData = useSelector((state) => state.auth.userData)

  const navigate = useNavigate()
  const { slug } = useParams()

  useEffect(() => {
    setSpinner(true)

    appwriteService.getPost(slug)
      .then((post) => {
        if (post) {
          setPost(post)
        } else {
          navigate('/')
        }
      })
      .finally(() => {
        setSpinner(false)
      })

  }, [slug, navigate])

  const isAuthor =
    post && userData
      ? post.userId === userData.$id
      : false

  const deletePost = () => {
    setPopup(true)
  }

  return (
    <div className='relative w-full min-h-screen bg-gray-200 py-10'>

      {/* Loading Overlay */}
      {spinner && (
        <div className='absolute inset-0 z-50 bg-black/20 backdrop-blur-sm flex justify-center items-center cursor-not-allowed'>
          <Spinner />
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {popup && (
        <Popup
          para='Are you sure you want to delete this post?'
          onConfirm={() => {
            setIsLoading(true)

            appwriteService.deletePost(post.$id)
              .then((status) => {
                if (status) {
                  appwriteService.deleteFile(post.featuredImage)
                  navigate('/')
                }
              })
              .finally(() => {
                setIsLoading(false)
                setPopup(false)
              })
          }}
          onCancel={() => {
            setPopup(false)
          }}
        />
      )}

      {post && (
        <Container>

          {/* Featured Image */}
          <div className='relative bg-white rounded-2xl shadow-md p-4 mb-6'>

            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className='mx-auto max-h-[500px] object-cover rounded-xl'
            />

            {isAuthor && (
              <div className='absolute top-8 right-8 flex gap-3'>

                <Link to={`/edit-post/${post.$id}`}>
                  <Button
                    bgColor='bg-green-500'
                    className='hover:bg-green-600 cursor-pointer'
                  >
                    Edit
                  </Button>
                </Link>

                <Button
                  isLoading={isLoading}
                  bgColor='bg-red-500'
                  className='hover:bg-red-600 cursor-pointer'
                  onClick={deletePost}
                >
                  Delete
                </Button>

              </div>
            )}

          </div>

          {/* Title + Date */}
          <div className='mb-6'>
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>
              {post.title}
            </h1>

            <PostDate
              className='text-sm text-gray-500 font-medium'
              dateString={post.$createdAt}
            />
          </div>

          {/* Content */}
          <div className='bg-white rounded-2xl shadow-md p-8'>
            <div className='browser-css text-gray-700 leading-8'>
              {parse(post.content)}
            </div>
          </div>

        </Container>
      )}

    </div>
  )
}

export default Post