import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, PostCard, Button } from "../components";
import appwriteService from "../appwrite/config";
import { Query } from "appwrite";
import Spinner from "../components/Spinner";
import { Popup } from "../components";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import PostCardSkeleton from "../components/PostCardSkeleton";
import usersService from "../appwrite/users";

function Profile() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [popup, setPopup] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [zoomedPhoto, setZoomedPhoto] = useState(false);

  const { username } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (!username) return;
    setIsLoading(true);

    usersService
      .getUserByUsername(username)
      .then((profile) => {
        if (profile) {
          setProfileData(profile);
          // fetch this user's posts
          return appwriteService.getPosts([
            Query.equal("userId", profile.userId),
          ]);
        }
      })
      .then((posts) => {
        if (posts) setPosts(posts.documents);
      })
      .finally(() => setIsLoading(false));
  }, [username]);

  const isOwner = userData?.$id === profileData?.userId;

  return (
    <div className="w-full min-h-screen py-10 bg-gray-200 dark:bg-gray-800">
      {popup && (
        <Popup
          para="Are you sure you want to delete this post?"
          onConfirm={() => {
            setIsLoading(true);
            appwriteService
              .deletePost(postToDelete.$id)
              .then((status) => {
                if (status) {
                  appwriteService.deleteFile(postToDelete.featuredImage);
                  setPosts((prev) =>
                    prev.filter((p) => p.$id !== postToDelete.$id),
                  );
                  toast.success("Post deleted successfully!");
                  setPostToDelete(null);
                  setPopup(false);
                }
              })
              .catch((error) => {
                if (
                  error.message.includes("Failed to fetch") ||
                  error.message.includes("Network")
                ) {
                  toast.error(
                    "Network error. Please check your internet connection.",
                    { id: "delete-error" },
                  );
                } else {
                  toast.error("Something went wrong. Please try again.", {
                    id: "standard-error",
                  });
                }
              })
              .finally(() => setIsLoading(false));
          }}
          onCancel={() => {
            setPopup(false);
            setPostToDelete(null);
          }}
        />
      )}

      <Container>
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-indigo-100 dark:bg-gray-600 flex justify-center items-center shrink-0 overflow-hidden">
              {profileData?.profilePhoto ? (
                <img
                  src={appwriteService.getFilePreview(profileData.profilePhoto)}
                  alt={profileData.username}
                  onClick={() => setZoomedPhoto(true)}
                  className="w-full h-full object-cover cursor-pointer"
                />
              ) : (
                <i className="fa-regular fa-circle-user text-5xl text-indigo-600 dark:text-gray-300"></i>
              )}
            </div>

            {zoomedPhoto && (
              <div
                className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center cursor-pointer"
                onClick={() => setZoomedPhoto(false)}
              >
                <img
                  src={appwriteService.getFilePreview(profileData.profilePhoto)}
                  className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl"
                />
              </div>
            )}

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                {profileData?.name}
              </h1>
              <p className="text-indigo-600 dark:text-indigo-400 mt-1 font-medium">
                @{profileData?.username || username}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                {profileData?.email}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed max-w-2xl">
                {profileData?.bio ||
                  "No bio added yet. Tell the world something about yourself."}
              </p>
              <div className="flex items-center gap-6 mt-5">
                <div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {posts.length}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Posts
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {profileData?.profileComplete ? "100%" : "70%"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Profile Complete
                  </p>
                </div>
              </div>
            </div>

            <div>
              {isOwner && (
                <Link to="/edit-profile">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
                    Edit Profile
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* User Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            My Posts
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {posts.map((post, index) => (
                <motion.div
                  key={post.$id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <PostCard
                    $id={post.$id}
                    title={post.title}
                    featuredImage={post.featuredImage}
                    $createdAt={post.$createdAt}
                    content={post.content}
                    showAction={isOwner}
                    isMenuOpen={openMenuId === post.$id}
                    onMenuToggle={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === post.$id ? null : post.$id);
                    }}
                    onEdit={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate(`/edit-post/${post.$id}`);
                    }}
                    onDelete={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setPostToDelete(post);
                      setPopup(true);
                      setOpenMenuId(null);
                    }}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-10 text-center">
              {isOwner ? (
                <>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    You haven't written any posts yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Share your thoughts, ideas, and stories with the world.
                  </p>
                  <Link to="/add-post">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
                      Write Your First Post
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    No posts yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    This user hasn't written anything yet.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Profile;
