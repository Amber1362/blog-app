import React, { useState, useEffect, useRef } from "react";
import { Container, PostCard, Button } from "../components";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PostCardSkeleton from "../components/PostCardSkeleton";
import handleError from "../utils/handleError";
import { useInfinitePosts } from "../hooks/useInfinitePosts";

function Home() {
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  const authStatus = useSelector((state) => state.auth.status);

  const {
    data,
    isLoading,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfinitePosts();

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  // Intersection Observer
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

  if (isError) {
    return (
      <div className="relative w-full min-h-screen bg-gray-200 py-10 dark:bg-gray-800 dark:text-white">
        <Container>
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-5xl mb-4">⚠️</p>

            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Something went wrong
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
              {error?.message?.includes("Failed to fetch")
                ? "No internet connection. Please check your network."
                : "Failed to load posts. Please try again."}
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
    <div className="relative w-full min-h-screen bg-gray-200 py-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
      <Container>
        {authStatus ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Latest Posts
              </h1>
              <p className="text-gray-500 mt-1 dark:text-gray-400">
                Discover stories, ideas, and shared experiences
              </p>
            </div>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <PostCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {posts.map((post, index) => (
                  <motion.div
                    key={post.$id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <PostCard {...post} />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Intersection Observer trigger point */}
            <div ref={loadMoreRef} className="h-1" />

            {/* No more posts */}
            {!hasNextPage && !isLoading && (
              <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
                You've reached the end.
              </p>
            )}
          </>
        ) : (
          /* Logged Out State */
          <div className="w-full min-h-screen bg-gray-200 dark:bg-gray-800">
            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center text-center py-16 sm:py-24 px-6">
              {/* Badge */}
              <div className="inline-block px-4 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-medium rounded-full mb-6">
                AI writing assistant
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent mb-6 max-w-2xl leading-tight">
                Ideas deserve a home.
              </h1>

              {/* Subtext */}
              <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
                Vella is a clean, modern blogging platform. Write freely,
                publish easily, and let AI help when you need it.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer px-8 py-3">
                    Start Writing
                  </Button>
                </Link>
                <Link to="/all-posts" className="w-full sm:w-auto">
                  <Button
                    bgColor="bg-white dark:bg-gray-700"
                    textColor="text-black"
                    className="w-full sm:w-auto text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer px-8 py-3"
                  >
                    Explore Posts
                  </Button>
                </Link>
              </div>
            </div>

            {/* Features Strip */}
            <div className="max-w-5xl mx-auto px-6 pb-16 sm:pb-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300">
                <p className="text-2xl mb-3">✍️</p>
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">
                  Rich text editor
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Write and format posts with a full-featured editor
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300">
                <p className="text-2xl mb-3">🤖</p>
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">
                  AI content helper
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Stuck on what to write? Get a content suggestion based on your
                  title
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300">
                <p className="text-2xl mb-3">🔒</p>
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">
                  Secure auth
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Sign up, login, and password recovery built in
                </p>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;
