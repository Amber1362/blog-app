import { useMutation, useQueryClient } from "@tanstack/react-query";
import appwriteService from "../appwrite/config";
import toast from "react-hot-toast";

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ post, data }) => {
      const file = data.image?.[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      const { image, ...postData } = data;

      const updatedPost = await appwriteService.updatePost(post.$id, {
        ...postData,
        featuredImage: file ? file.$id : undefined,
      });

      if (!updatedPost) {
        throw new Error("Failed to update post");
      }

      if (file && post.featuredImage) {
        await appwriteService.deleteFile(post.featuredImage);
      }

      return updatedPost;
    },

    onSuccess: (updatedPost) => {
      toast.success("Post updated successfully!");

      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["post", updatedPost.$id],
      });

      queryClient.invalidateQueries({
        queryKey: ["user-posts", updatedPost.userId],
      });
    },

    onError: (error) => {
      toast.error(error.message || "Failed to update post");
    },
  });
};
