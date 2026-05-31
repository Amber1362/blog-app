import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container, Button, Popup, PostDate } from "../components";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import usersService from "../appwrite/users";

function Post() {
  const [post, setPost] = useState(null);
  const [popup, setPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [author, setAuthor] = useState(null);

  const userData = useSelector((state) => state.auth.userData);

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    setSpinner(true);

    appwriteService
      .getPost(slug)
      .then(async (post) => {
        if (post) {
          setPost(post);
          if (post.userId) {
            const author = await usersService.getUserProfile(post.userId);
            setAuthor(author);
          }
        } else {
          navigate("/");
        }
      })
      .finally(() => {
        setSpinner(false);
      });
  }, [slug, navigate]);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  const deletePost = () => {
    setPopup(true);
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-200 dark:bg-gray-800 py-10">
      {/* Loading Overlay */}
      {spinner && (
        <div className="absolute inset-0 z-50 bg-black/20 backdrop-blur-sm flex justify-center items-center cursor-not-allowed">
          <Spinner />
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {popup && (
        <Popup
          para="Are you sure you want to delete this post?"
          onConfirm={() => {
            setIsLoading(true);

            appwriteService
              .deletePost(post.$id)
              .then((status) => {
                if (status) {
                  appwriteService.deleteFile(post.featuredImage);
                  toast.success("Post deleted successfully!");
                  navigate("/");
                }
              })
              .catch((error) => {
                if (
                  error.message.includes("Failed to fetch") ||
                  error.message.includes("Network")
                ) {
                  toast.error(
                    "Network error. Please check your internet connection.",
                    {
                      id: "delete-error",
                    },
                  );
                } else {
                  toast.error("Something went wrong. Please try again.", {
                    id: "standard-error",
                  });
                }
              })
              .finally(() => {
                setIsLoading(false);
                setPopup(false);
              });
          }}
          onCancel={() => {
            setPopup(false);
          }}
        />
      )}

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
                  isLoading={isLoading}
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
