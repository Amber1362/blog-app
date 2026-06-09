import { useMutation, useQueryClient } from "@tanstack/react-query";
import bookmarkService from "../appwrite/bookmark";
import toast from "react-hot-toast";

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ isBookmarked, bookmarkId, userId, postId }) => {
      if (!isBookmarked) {
        await bookmarkService.createBookmark({
          userId,
          postId,
        });

        return {
          action: "added",
          userId,
          postId,
        };
      }

      await bookmarkService.deleteBookmark(bookmarkId);

      return {
        action: "removed",
        userId,
        postId,
      };
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["bookmark-status", data.userId, data.postId],
      });

      toast.success(
        data.action === "added" ? "Post bookmarked" : "Bookmark removed",
      );
    },

    onError: (error) => {
      toast.error(error.message || "Bookmark action failed");
    },
  });
};
