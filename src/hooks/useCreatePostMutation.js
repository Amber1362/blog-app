import { useMutation, useQueryClient } from "@tanstack/react-query";
import appwriteService from "../appwrite/config";
import toast from "react-hot-toast";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, userId }) => {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (!file) {
        throw new Error("Failed to upload image");
      }

      const { image, ...postData } = data;

      const dbPost = await appwriteService.createPost({
        ...postData,
        featuredImage: file.$id,
        userId,
      });

      if (!dbPost) {
        throw new Error("Failed to create post");
      }

      return {
        post: dbPost,
        userId,
      };
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user-posts", data.userId],
      });

      toast.success("Post uploaded successfully!");
    },

    onError: (error) => {
      if (error.message.includes("already exists")) {
        toast.error("This slug is already taken. Please use a different one.");
        return;
      }

      toast.error(error.message || "Failed to create post");
    },
  });
};
