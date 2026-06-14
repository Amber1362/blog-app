import React, { useCallback, useEffect, useState, lazy, Suspense } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../Spinner";
import AiChatBox from "../gemini/AiChatBox";
import toast from "react-hot-toast";
import handleError from "../../utils/handleError";
import RTESkeleton from "../RTESkeleton";
import { useCreatePost } from "../../hooks/useCreatePostMutation";
import { useUpdatePost } from "../../hooks/useUpdatePostMutation";

const RTE = lazy(() => import("../RTE"));

function PostForm({ post }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAi, setShowAi] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const createPostMutation = useCreatePost();
  const updatePostMutation = useUpdatePost();

  const submit = async (data) => {
    if (post) {
      updatePostMutation.mutate(
        {
          post,
          data,
        },
        {
          onSuccess: (updatedPost) => {
            navigate(`/post/${updatedPost.$id}`);
          },
        },
      );

      return;
    }

    createPostMutation.mutate(
      {
        data,
        userId: userData.$id,
      },
      {
        onSuccess: (createdPost) => {
          navigate(`/post/${createdPost.post.$id}`);
        },
      },
    );
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [slugTransform, watch, setValue]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center cursor-not-allowed">
          <Spinner />
        </div>
      )}

      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        {error && (
          <p className="text-red-600 mt-8 text-left mb-4 font-bold text-sm">
            {error}
          </p>
        )}
        <div className="w-full md:w-2/3 px-2">
          <div className="block">
            <Input
              label="Title :"
              placeholder="Title"
              className="mb-4 shadow-sm dark:bg-gray-600 dark:border-gray-600 dark:text-gray-300"
              {...register("title", { required: "Title is required." })}
            />
            {errors.title && (
              <p className="text-sm text-red-600 font-bold text-left mb-4">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="block">
            <Input
              label="Slug :"
              placeholder="Slug"
              className="mb-2 shadow-sm dark:bg-gray-600 dark:border-gray-600 dark:text-gray-300"
              {...register("slug", { required: "Slug is required." })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
            {errors.slug && (
              <p className="text-sm text-red-600 font-bold text-left mb-4">
                {errors.slug.message}
              </p>
            )}
          </div>

          <Suspense fallback={<RTESkeleton />}>
            <RTE
              label="Content :"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </Suspense>
        </div>

        <div className="w-full md:w-1/3 px-2 mt-4 md:mt-0">
          <div>
            <Button
              type="button"
              className="mb-4 w-full cursor-pointer hover:bg-indigo-700 flex items-center justify-center bg-indigo-500 shadow-sm"
              onClick={() => setShowAi(true)}
            >
              Generate with AI
            </Button>
          </div>

          {showAi && (
            <AiChatBox
              title={getValues("title")}
              onClose={() => setShowAi(false)}
            />
          )}

          <div className="block">
            <Input
              label="Featured Image :"
              type="file"
              className="mb-4 shadow-sm dark:bg-gray-600 dark:border-gray-600 dark:text-gray-300"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", {
                required: !post ? "Upload the image." : false,
              })}
            />

            {errors.image && (
              <p className="text-sm text-red-600 font-bold text-left mb-4">
                {errors.image.message}
              </p>
            )}
          </div>

          {post && (
            <div className="w-full mb-4 shadow-sm">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4 shadow-sm dark:bg-gray-600 dark:border-gray-600 dark:text-gray-300"
            {...register("status", { required: true })}
          />
          <Button
            isLoading={isLoading}
            type="submit"
            bgColor={post ? "bg-green-500" : "bg-blue-500"}
            className="w-full cursor-pointer hover:bg-indigo-700 flex items-center justify-center bg-indigo-600 shadow-sm"
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default PostForm;
