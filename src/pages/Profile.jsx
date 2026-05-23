import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, PostCard, Button } from "../components";
import appwriteService from "../appwrite/config";
import { Query } from "appwrite";
import Spinner from "../components/Spinner";
import { Popup } from "../components";
import toast from "react-hot-toast";

function Profile() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [popup, setPopup] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const { name } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (!userData) return;
    setIsLoading(true);
    appwriteService
      .getPosts([Query.equal("userId", userData.$id)])
      .then((posts) => {
        if (posts) setPosts(posts.documents);
      })
      .finally(() => setIsLoading(false));
  }, [userData?.$id]);

  return (
    <div className="w-full min-h-screen py-10 bg-gray-200 dark:bg-gray-800">

      {popup && (
        <Popup
          para='Are you sure you want to delete this post?'
          onConfirm={() => {
            setIsLoading(true)
            appwriteService.deletePost(postToDelete.$id)
              .then((status) => {
                if(status) {
                  appwriteService.deleteFile(postToDelete.featuredImage)
                  setPosts(prev => prev.filter(p => p.$id !== postToDelete.$id))
                  toast.success('Post deleted successfully!')
                  setPostToDelete(null)
                  setPopup(false)
                }
              })
              .catch((error) => {
                if(error.message.includes('Failed to fetch') || error.message.includes('Network')) {
                  toast.error('Network error. Please check your internet connection.', { id: 'delete-error' })
                } else {
                  toast.error('Something went wrong. Please try again.', { id: 'standard-error' })
                }
              })
              .finally(() => setIsLoading(false))
          }}
          onCancel={() => {
            setPopup(false)
            setPostToDelete(null)
          }}
        />
      )}

      <Container>
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            
            <div className="w-24 h-24 rounded-full bg-indigo-100 dark:bg-gray-600 flex justify-center items-center shrink-0">
              <i className="fa-regular fa-circle-user text-5xl text-indigo-600 dark:text-gray-300"></i>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{userData?.name}</h1>
              <p className="text-indigo-600 dark:text-indigo-400 mt-1 font-medium">@{userData?.username || name}</p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">{userData?.email}</p>
              <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed max-w-2xl">
                {userData?.bio || "No bio added yet. Tell the world something about yourself."}
              </p>
              <div className="flex items-center gap-6 mt-5">
                <div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{posts.length}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Posts</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{userData?.profileComplete ? "100%" : "70%"}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Profile Complete</p>
                </div>
              </div>
            </div>

            <div>
              <Link to="/profile-setup">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">Edit Profile</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* User Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">My Posts</h2>

          {isLoading ? (
            <div className="flex justify-center items-center py-10"><Spinner /></div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {posts.map((post) => (
                <PostCard
                  key={post.$id}
                  $id={post.$id}
                  title={post.title}
                  featuredImage={post.featuredImage}
                  $createdAt={post.$createdAt}
                  showAction={true}
                  isMenuOpen={openMenuId === post.$id}
                  onMenuToggle={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setOpenMenuId(openMenuId === post.$id ? null : post.$id)
                  }}
                  onEdit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    navigate(`/edit-post/${post.$id}`)
                  }}
                  onDelete={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setPostToDelete(post)
                    setPopup(true)
                    setOpenMenuId(null)
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-10 text-center">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">You haven't written any posts yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Share your thoughts, ideas, and stories with the world.</p>
              <Link to="/add-post">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">Write Your First Post</Button>
              </Link>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Profile;