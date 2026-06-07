import { useInfiniteBookmarks } from "../hooks/useBookmarks";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Spinner from "../components/Spinner";
import { Container, PostCard } from "../components";
import PostCardSkeleton from "../components/PostCardSkeleton";

function BookmarkedPosts() {
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  const userData = useSelector((state) => state.auth.userData);

  const {
    data,
    isLoading,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteBookmarks(userData?.$id);

  const bookmarkedPosts = data?.pages.flatMap((page) => page.posts) || [];

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

  return (
    <div className="w-full min-h-screen py-10 bg-gray-200 dark:bg-gray-800">
      <Container>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Bookmarked Posts
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          ) : bookmarkedPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bookmarkedPosts.map((post, index) => (
                <motion.div
                  key={post.$id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                  }}
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
          ) : (
            <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-10 text-center">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                No bookmarked posts yet
              </h3>

              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Save posts to read them later.
              </p>
            </div>
          )}
        </div>

        <div ref={loadMoreRef} className="h-1" />

        {isFetchingNextPage && (
          <div className="flex justify-center mt-6">
            <Spinner />
          </div>
        )}

        {bookmarkedPosts.length > 0 && !hasNextPage && !isLoading && (
          <p className="text-center text-gray-500 mt-6">
            You've reached the end.
          </p>
        )}
      </Container>
    </div>
  );
}

export default BookmarkedPosts;
