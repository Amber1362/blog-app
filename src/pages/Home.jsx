import React, { useState, useEffect, useRef } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard, Button } from "../components";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PostCardSkeleton from "../components/PostCardSkeleton";
import usersService from "../appwrite/users";
import { Query } from "appwrite";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user_data = useSelector((state) => state.auth.userData);
  const limit = 8;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    setIsLoading(true);

    if (!authStatus) {
      setIsLoading(false);
      return;
    }

    appwriteService
      .getPosts([
        Query.limit(limit),
        Query.offset((page - 1) * limit),
      ])
      .then(async (result) => {
        if (result) {
          const posts = result.documents;
          const uniqueUserIds = [...new Set(posts.map((p) => p.userId))];

          if (uniqueUserIds.length === 0) {
            setPosts((prev) => [...prev, ...posts]);
            setHasMore(posts.length === limit);
            return;
          }

          const authorsResult = await usersService.getUsersByIds(uniqueUserIds);

          const authorMap = {};
          authorsResult.documents.forEach((author) => {
            authorMap[author.userId] = author;
          });

          const postsWithAuthor = posts.map((post) => ({
            ...post,
            author: authorMap[post.userId] || null,
          }));

          setPosts((prev) => [...prev, ...postsWithAuthor]);
          setHasMore(posts.length === limit);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [authStatus, page]);

  // Intersection Observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 },
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [hasMore, isLoading]);

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
            {isLoading && page === 1 ? (
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
            {!hasMore && !isLoading && (
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
              <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-sm">
                <p className="text-2xl mb-3">✍️</p>
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">
                  Rich text editor
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Write and format posts with a full-featured editor
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-sm">
                <p className="text-2xl mb-3">🤖</p>
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">
                  AI content helper
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Stuck on what to write? Get a content suggestion based on your
                  title
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-sm">
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
