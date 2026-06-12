import React, { useState, useEffect, useRef } from "react";
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
import handleError from "../utils/handleError";
import { useProfile } from "../hooks/useProfile";
import { useInfiniteUserPosts } from "../hooks/useInfiniteUserPosts";
import { useDeletePost } from "../hooks/useDeletePost";
import { AnimatePresence } from "framer-motion";

function Profile() {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [popup, setPopup] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [zoomedPhoto, setZoomedPhoto] = useState(false);

  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  const { username } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const deletePostMutation = useDeletePost();

  //Profile fetching
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
    error: profileError,
    refetch: refetchProfile,
  } = useProfile(username);

  //User Profile Posts fetching
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteUserPosts(profileData?.userId);

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const isOwner = userData?.$id === profileData?.userId;

  if (isProfileLoading) {
    return (
      <div className="w-full min-h-screen py-10 bg-gray-200 dark:bg-gray-800">
        <Container>
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        </Container>
      </div>
    );
  }

  if (isProfileError) {
    return (
      <div className="w-full min-h-screen py-10 bg-gray-200 dark:bg-gray-800">
        <Container>
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-5xl mb-4">⚠️</p>

            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Failed to load profile
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
              {profileError?.message?.includes("Failed to fetch")
                ? "No internet connection. Please check your network."
                : "Unable to load this profile. Please try again."}
            </p>

            <button
              onClick={() => refetchProfile()}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg cursor-pointer"
            >
              Try Again
            </button>
          </div>
        </Container>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full min-h-screen py-10 bg-gray-200 dark:bg-gray-800">
        <Container>
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-5xl mb-4">⚠️</p>

            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Failed to load posts
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
              {error?.message?.includes("Failed to fetch")
                ? "No internet connection. Please check your network."
                : "Unable to load posts. Please try again."}
            </p>

            <button
              onClick={() => refetch()}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg cursor-pointer"
            >
              Try Again
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-10 bg-gray-200 dark:bg-gray-800">
      <AnimatePresence>
        {popup && (
          <Popup
            para="Are you sure you want to delete this post?"
            onConfirm={() => {
              if (deletePostMutation.isPending) return;

              deletePostMutation.mutate(postToDelete, {
                onSuccess: () => {
                  setPopup(false);
                  navigate("/");
                  setPostToDelete(null);
                },
              });
            }}
            isLoading={deletePostMutation.isPending}
            onCancel={() => {
              setPopup(false);
              setPostToDelete(null);
            }}
          />
        )}
      </AnimatePresence>

      <Container>
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-8 mb-8"
        >
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

            <div className="flex gap-3">
              {isOwner && (
                <Link to="/edit-profile">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
                    Edit Profile
                  </Button>
                </Link>
              )}
              {isOwner && (
                <Link to="/bookmarks">
                  <Button
                    bgColor="bg-gray-200 dark:bg-gray-600"
                    textColor="text-gray-700"
                    className="border border-gray-200 dark:border-gray-500 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 cursor-pointer"
                  >
                    Bookmarks
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>

        {/* User Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            My Posts
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
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
                    author={post.author}
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

        <div ref={loadMoreRef} className="h-1" />

        {isFetchingNextPage && (
          <div className="flex justify-center mt-6">
            <Spinner />
          </div>
        )}

        {!hasNextPage && posts.length > 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
            You've reached the end.
          </p>
        )}
      </Container>
    </div>
  );
}

export default Profile;
