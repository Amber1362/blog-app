import { useQuery } from "@tanstack/react-query";
import bookmarkService from "../appwrite/bookmark";

export const useBookmarkStatus = (userId, postId) => {
  return useQuery({
    queryKey: ["bookmark-status", userId, postId],

    queryFn: async () => {
      const bookmark = await bookmarkService.checkBookmark(
        userId,
        postId,
      );

      return {
        isBookmarked: !!bookmark,
        bookmarkId: bookmark ? bookmark.$id : null,
      };
    },

    enabled: !!userId && !!postId,
  });
};