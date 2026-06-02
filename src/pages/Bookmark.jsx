import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Query } from "appwrite";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

import bookmarkService from "../appwrite/bookmark";
import appwriteService from "../appwrite/config";

import { Container, PostCard } from "../components";

import PostCardSkeleton from "../components/PostCardSkeleton";

function BookmarkedPosts() {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const limit = 8;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (!userData) return;
    setIsLoading(true);

    bookmarkService
      .getUserBookmarks(userData.$id, limit, page)
      .then(async (bookmarks) => {
        if (bookmarks.documents.length === 0) {
          setHasMore(false);
          return;
        }

        const postIds = bookmarks.documents.map((b) => b.postId);
        const posts = await appwriteService.getPosts([
          Query.equal("$id", postIds),
        ]);

        setBookmarkedPosts((prev) => [...prev, ...posts.documents]);
        setHasMore(bookmarks.documents.length === limit);
      })
      .catch(() => toast.error("Failed to load bookmarks"))
      .finally(() => setIsLoading(false));
  }, [userData, page]);

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

        {isLoading && page > 1 && (
          <div className="flex justify-center mt-6">
            <Spinner />
          </div>
        )}

        {!hasMore && bookmarkedPosts.length > 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
            You've reached the end.
          </p>
        )}
      </Container>
    </div>
  );
}

export default BookmarkedPosts;
