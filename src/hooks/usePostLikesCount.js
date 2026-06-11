import { useQuery } from "@tanstack/react-query";
import likeService from "../appwrite/like";

export const usePostLikesCount = (postId) => {
  return useQuery({
    queryKey: ["likes-count", postId],

    queryFn: () =>
      likeService.getPostLikesCount(postId),

    enabled: !!postId,
  });
};