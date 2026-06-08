import { useMutation, useQueryClient } from "@tanstack/react-query";
import appwriteService from "../appwrite/config";
import toast from "react-hot-toast";

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (post) => {
      await appwriteService.deletePost(post.$id);

      if (post.featuredImage) {
        await appwriteService.deleteFile(post.featuredImage);
      }

      return post;
    },

    onSuccess: (deletedPost) => {
      toast.success("Post deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["user-posts", deletedPost.userId],
      });
    },

    onError: (error) => {
      toast.error(error.message || "Failed to delete post");
    },
  });
};
