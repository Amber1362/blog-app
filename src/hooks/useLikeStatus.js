import { useQuery } from "@tanstack/react-query";
import likeService from "../appwrite/like";

export const useLikeStatus = (userId, postId) => {
  return useQuery({
    queryKey: ["like-status", userId, postId],

    queryFn: async () => {
      const like = await likeService.checkLike(
        userId,
        postId,
      );

      return {
        isLiked: !!like,
        likeId: like ? like.$id : null,
      };
    },

    enabled: !!userId && !!postId,
  });
};