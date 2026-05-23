import React, { useState, useEffect, useRef } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard, Input } from "../components";
import Spinner from "../components/Spinner";
import { Query } from "appwrite";
import { motion } from "framer-motion";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 4;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);

    appwriteService
      .getPosts([
        Query.limit(limit),
        Query.offset((page - 1) * limit),
        Query.orderDesc("$createdAt"),
      ])
      .then((posts) => {
        if (posts) {
          setPosts((prev) => [...prev, ...posts.documents]);
          setHasMore(posts.documents.length === limit);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  // Intersection Observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        setPage((prev) => prev + 1);
      }
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [hasMore, isLoading]);

  const searchPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="relative w-full min-h-screen py-10 bg-gray-200 dark:bg-gray-800">
      {/* Loading Overlay
      {isLoading && (
        <div className="absolute inset-0 z-50 bg-black/20 backdrop-blur-sm flex justify-center items-center cursor-not-allowed">
          <Spinner />
        </div>
      )} */}

      <Container>
        {/* Page Heading */}
        <div className="flex">
          <div className="mb-8 w-2/3">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              All Posts
            </h1>
            <p className="text-gray-500 mt-1 dark:text-gray-400">
              Explore published stories and ideas
            </p>
          </div>

          <div className="mb-8 w-1/3">
            <Input
              label="Search Post :"
              placeholder="Search by title"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4 shadow-sm dark:bg-gray-600 dark:border-gray-600 dark:text-gray-300"
            />
          </div>
        </div>

        {/* Posts Grid */}
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
              />
            </motion.div>
          ))}
        </div>

        {searchPosts.length === 0 && searchQuery && !isLoading && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
            No posts found for "{searchQuery}"
          </p>
        )}

        {/* Intersection Observer trigger point */}
        <div ref={loadMoreRef} className="h-1" />

        {/* Loading indicator at bottom */}
        {isLoading && page > 1 && (
          <div className="flex justify-center mt-6">
            <Spinner />
          </div>
        )}

        {isLoading && page === 1 && (
          <div className="absolute inset-0 z-50 bg-black/20 backdrop-blur-sm flex justify-center items-center cursor-not-allowed">
            <Spinner />
          </div>
        )}

        {/* No more posts */}
        {!hasMore && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
            You've reached the end.
          </p>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
