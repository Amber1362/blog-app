import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
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
}) {
  return (
    <Link to={`/post/${$id}`} className="h-full">
      <div className="relative w-full bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:bg-gray-600 dark:border-gray-600">
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
            <button onClick={onEdit} className="block w-full text-left px-4 rounded-2xl py-2 text-sm hover:bg-white dark:hover:bg-gray-600">
              <strong>Edit</strong>
            </button>
            <button onClick={onDelete} className="block w-full text-left px-4 rounded-2xl py-2 text-sm text-red-500 hover:bg-white dark:hover:bg-gray-600">
              <strong>Delete</strong>
            </button>
          </div>
        )}

        {/* Image */}
        <div className="w-full flex justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl w-full object-cover h-48"
          />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 dark:text-white">
          {title}
        </h2>

        {/* Date */}
        <div className="mt-3">
          <PostDate
            className="text-sm text-gray-500 font-medium dark:text-gray-400"
            dateString={$createdAt}
          />
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
