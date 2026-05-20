import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, PostCard, Button } from "../components";
import appwriteService from "../appwrite/config";
import { Query } from "appwrite";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

function Profile() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { name } = useParams();

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (!userData) return;
    setIsLoading(true);

    appwriteService
      .getPosts([Query.equal("userId", userData.$id)])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userData]);
  return (
    <div className="w-full min-h-screen py-10 bg-gray-200 dark:bg-gray-800">
      <Container>
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-8 mb-8">
          <div className="flex items-center gap-6">
            {/* Profile Icon */}
            <div className="w-24 h-24 rounded-full bg-indigo-100 dark:bg-gray-600 flex justify-center items-center">
              <i className="fa-regular fa-circle-user text-5xl text-indigo-600 dark:text-gray-300"></i>
            </div>

            {/* User Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                {userData?.name}
              </h1>

              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {userData?.email}
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                Total Posts: {posts.length}
              </p>

              <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-3 font-medium">
                @{name}
              </p>
            </div>
          </div>
        </div>

        {/* User Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            My Posts
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Spinner />
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {posts.map((post) => (
                <PostCard
                  key={post.$id}
                  $id={post.$id}
                  title={post.title}
                  featuredImage={post.featuredImage}
                  $createdAt={post.$createdAt}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-10 text-center">
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
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Profile;
