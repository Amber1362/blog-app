import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { motion } from 'framer-motion'

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user_data = useSelector((state) => state.auth.userData);

  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    setIsLoading(true);

    if (!authStatus) {
      setIsLoading(false);
      return;
    }

    appwriteService
      .getPosts()
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [authStatus]);

  return (
    <div className="relative w-full min-h-screen bg-gray-200 py-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 bg-black/20 backdrop-blur-sm flex justify-center items-center cursor-not-allowed">
          <Spinner />
        </div>
      )}

      <Container>
        {authStatus ? (
          <>
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Latest Posts
              </h1>

              <p className="text-gray-500 mt-1 dark:text-gray-400">
                Discover stories, ideas, and shared experiences
              </p>
            </div>

            {/* Posts Grid */}
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
          </>
        ) : (
          /* Logged Out State */
          <div className="flex flex-col justify-center items-center min-h-[70vh] text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-3">
              Welcome to Vella
            </h1>

            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md">
              Sign in to explore stories, thoughts, and posts shared by others.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;
