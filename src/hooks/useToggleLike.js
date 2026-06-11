import { useMutation, useQueryClient } from "@tanstack/react-query";
import likeService from "../appwrite/like";
import toast from "react-hot-toast";

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ isLiked, likeId, userId, postId }) => {
      if (!isLiked) {
        await likeService.addLike({
          userId,
          postId,
        });

        return {
          action: "added",
          userId,
          postId,
        };
      }

      await likeService.removeLike(likeId);

      return {
        action: "removed",
        userId,
        postId,
      };
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["like-status", data.userId, data.postId],
      });

      queryClient.invalidateQueries({
        queryKey: ["likes-count", data.postId],
      });

      toast.success(data.action === "added" ? "Post liked" : "Like removed");
    },

    onError: (error) => {
      toast.error(error.message || "Like action failed");
    },
  });
};
