import React, { useState, useEffect, useRef } from "react";
import { Container, PostCard, Input } from "../components";
import { motion } from "framer-motion";
import PostCardSkeleton from "../components/PostCardSkeleton";
import { useInfinitePosts } from "../hooks/usePosts";

function AllPosts() {
  const [searchQuery, setSearchQuery] = useState("");

  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
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

  const searchPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="relative w-full min-h-screen py-10 bg-gray-200 dark:bg-gray-800">
      <Container>
        {/* Page Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center mb-8 gap-4">
          <div className="sm:flex-1">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              All Posts
            </h1>
            <p className="text-gray-500 mt-1 dark:text-gray-400">
              Explore published stories and ideas
            </p>
          </div>

          <div className="w-full sm:w-1/3">
            <Input
              label="Search Post :"
              placeholder="Search by title"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="shadow-sm dark:bg-gray-600 dark:border-gray-600 dark:text-gray-300"
            />
          </div>
        </div>

        {searchPosts.length === 0 && searchQuery && !isLoading && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
            No posts found for "{searchQuery}"
          </p>
        )}

        {/* Initial loading */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchPosts.map((post, index) => (
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
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Infinite scroll trigger */}
        <div ref={loadMoreRef} className="h-1" />

        {/* Fetching next page */}
        {isFetchingNextPage && (
          <div className="flex justify-center mt-6">
            <PostCardSkeleton />
          </div>
        )}

        {/* End message */}
        {!hasNextPage && !isLoading && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
            You've reached the end.
          </p>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
