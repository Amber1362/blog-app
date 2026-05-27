import React from "react";
import appwriteService from "../appwrite/config";
import { Link, useNavigate } from "react-router-dom";
import { Button, PostDate } from "./index";

function PostCard({
  $id,
  title,
  featuredImage,
  $createdAt,
  showAction = false,
  onMenuToggle,
  isMenuOpen,
  onEdit,
  onDelete,
  content,
  author,
}) {
  const navigate = useNavigate()

  const getReadTime = () => {
    if (!content) return 1;
    const plainText = content.replace(/<[^>]*>/g, "");
    const wordCount = plainText.trim().split(/\s+/).length;
    return Math.ceil(wordCount / 200);
  };

  const readTime = getReadTime();

  return (
    <Link to={`/post/${$id}`} className="h-full">
      <div className="relative w-full bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:bg-gray-600 dark:border-gray-600 hover:scale-105 group">
        {showAction && (
          <button
            onClick={onMenuToggle}
            className="absolute top-3 right-3 bg-black/30 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold z-10 hover:bg-black/50 cursor-pointer"
          >
            ⋮
          </button>
        )}

        {isMenuOpen && (
          <div className="absolute top-8 right-3 bg-gray-200 dark:bg-gray-800 shadow-lg rounded-lg p-2 z-20">
            <button
              onClick={onEdit}
              className="block w-full text-left px-4 rounded-2xl py-2 text-sm hover:bg-white dark:hover:bg-gray-600"
            >
              <strong>Edit</strong>
            </button>
            <button
              onClick={onDelete}
              className="block w-full text-left px-4 rounded-2xl py-2 text-sm text-red-500 hover:bg-white dark:hover:bg-gray-600"
            >
              <strong>Delete</strong>
            </button>
          </div>
        )}

        {/* Image */}
        <div className="overflow-hidden rounded-xl mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full object-cover h-48 transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 dark:text-white">
          {title}
        </h2>

        {/* Author */}
        {author && (
          <span
            onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            navigate(`/profile/${author.username.toLowerCase().replace(/\s+/g, "-")}`)
            }}
            className="text-xs text-indigo-500 dark:text-indigo-400 font-medium hover:underline mt-1 block"
          >
            @{author.username}
          </span>
        )}

        {/* Date */}
        <div className="mt-3">
          <PostDate
            className="text-sm text-gray-500 font-medium dark:text-gray-400"
            dateString={$createdAt}
          />
        </div>

        <p className="text-xs text-gray-400 mt-1">
          {readTime} {readTime === 1 ? "min" : "mins"} read
        </p>
      </div>
    </Link>
  );
}

export default PostCard;
