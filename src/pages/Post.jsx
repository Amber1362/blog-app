import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container, Button, Popup, PostDate } from "../components";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import handleError from "../utils/handleError";
import likeService from "../appwrite/like";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDeletePost } from "../hooks/useDeletePost";
import { useBookmarkStatus } from "../hooks/useBookmarkStatus";
import { useToggleBookmark } from "../hooks/useToggleBookmark";
import { usePost } from "../hooks/usePost";
import { useLikeStatus } from "../hooks/useLikeStatus";
import { useToggleLike } from "../hooks/useToggleLike";
import { usePostLikesCount } from "../hooks/usePostLikesCount";
import { AnimatePresence } from "framer-motion";

function Post() {
  const [popup, setPopup] = useState(false);

  const userData = useSelector((state) => state.auth.userData);
  const deletePostMutation = useDeletePost();
  const toggleBookmarkMutation = useToggleBookmark();
  const toggleLikeMutation = useToggleLike();

  const navigate = useNavigate();
  const { slug } = useParams();

  const { data, isLoading, isError, error } = usePost(slug);

  const post = data?.post;
  const author = data?.author;

  const { data: bookmarkStatus, isLoading: isBookmarkLoading } =
    useBookmarkStatus(userData?.$id, post?.$id);

  const isBookmarked = bookmarkStatus?.isBookmarked || false;

  const bookmarkId = bookmarkStatus?.bookmarkId || null;

  const handleBookmark = () => {
    if (!userData || !post) return;

    toggleBookmarkMutation.mutate({
      isBookmarked,
      bookmarkId,
      userId: userData.$id,
      postId: post.$id,
    });
  };

  const { data: likesCount = 0 } = usePostLikesCount(post?.$id);

  const { data: likeStatus, isLoading: isLikeLoading } = useLikeStatus(
    userData?.$id,
    post?.$id,
  );

  const isLiked = likeStatus?.isLiked || false;

  const likeId = likeStatus?.likeId || null;

  const handleLike = () => {
    if (!userData || !post) return;

    toggleLikeMutation.mutate({
      isLiked,
      likeId,
      userId: userData.$id,
      postId: post.$id,
    });
  };

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  const deletePost = () => {
    setPopup(true);
  };

  if (isError) {
    return (
      <div className="w-full min-h-screen py-10 bg-gray-200 dark:bg-gray-800">
        <Container>
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-5xl mb-4">⚠️</p>

            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Failed to load post
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
              {error?.message?.includes("Failed to fetch")
                ? "No internet connection. Please check your network."
                : "Unable to load this post. Please try again."}
            </p>

            <Button onClick={() => navigate("/")} className="cursor-pointer">
              Go Home
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-gray-200 dark:bg-gray-800 py-10">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 bg-black/20 backdrop-blur-sm flex justify-center items-center cursor-not-allowed">
          <Spinner />
        </div>
      )}

      {/* Delete Confirmation Popup */}
      <AnimatePresence>
        {popup && (
          <Popup
            para="Are you sure you want to delete this post?"
            onConfirm={() => {
              if (deletePostMutation.isPending) return;

              deletePostMutation.mutate(post, {
                onSuccess: () => {
                  setPopup(false);
                  navigate("/");
                },
              });
            }}
            isLoading={deletePostMutation.isPending}
            onCancel={() => {
              if (deletePostMutation.isPending) return;

              setPopup(false);
            }}
          />
        )}
      </AnimatePresence>

      {post && (
        <Container>
          {/* Featured Image */}
          <div className="relative bg-white dark:bg-gray-600 dark:border-gray-600 rounded-2xl shadow-md p-4 mb-6">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="mx-auto max-h-[500px] object-cover rounded-xl"
            />

            {isAuthor && (
              <div className="absolute top-3 right-3 sm:top-8 sm:right-8 flex gap-2 sm:gap-3">
                <Link
                  to={`/edit-post/${post.$id}`}
                  onClick={(e) => {
                    if (!navigator.onLine) {
                      e.preventDefault();
                      toast.error(
                        "Network error. Please check your internet connection.",
                      );
                    }
                  }}
                >
                  <Button
                    bgColor="bg-green-500"
                    className="hover:bg-green-600 cursor-pointer text-sm sm:text-base px-3 sm:px-4"
                  >
                    Edit
                  </Button>
                </Link>

                <Button
                  isLoading={deletePostMutation.isPending}
                  bgColor="bg-red-500"
                  className="hover:bg-red-600 cursor-pointer text-sm sm:text-base px-3 sm:px-4"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Title + Date */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold dark:text-gray-200 text-gray-800 mb-2">
              {post.title}
            </h1>

            {/* Author */}
            {author && (
              <span
                onClick={() => navigate(`/profile/${author.username}`)}
                className="text-sm text-indigo-500 dark:text-indigo-400 font-medium hover:underline cursor-pointer"
              >
                @{author.username}
              </span>
            )}

            <PostDate
              className="text-sm text-gray-500 dark:text-gray-400 font-medium"
              dateString={post.$createdAt}
            />
          </div>

          <div className="flex items-center gap-4 mt-2 mb-2">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className="text-2xl text-red-500 hover:scale-110 transition"
            >
              {isLiked ? <FaHeart /> : <FaRegHeart />}
            </button>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {likesCount} likes
            </div>

            {/* Bookmark Button */}
            <button
              onClick={handleBookmark}
              className="text-2xl text-indigo-500 hover:scale-110 transition"
            >
              {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
            </button>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-600 rounded-2xl shadow-md p-4 sm:p-8">
            <div className="browser-css text-gray-700 dark:text-gray-200 leading-8">
              {parse(post.content)}
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}

export default Post;
