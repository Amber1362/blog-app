import { useInfiniteQuery } from "@tanstack/react-query";
import bookmarkService from "../appwrite/bookmark";
import appwriteService from "../appwrite/config";
import usersService from "../appwrite/users";
import { Query } from "appwrite";

export const useInfiniteBookmarks = (userId, limit = 8) => {
  return useInfiniteQuery({
    queryKey: ["bookmarks", userId],

    enabled: !!userId,

    queryFn: async ({ pageParam = 1 }) => {
      const bookmarks = await bookmarkService.getUserBookmarks(
        userId,
        limit,
        pageParam,
      );

      if (bookmarks.documents.length === 0) {
        return {
          posts: [],
          nextPage: undefined,
        };
      }

      const postIds = bookmarks.documents.map((bookmark) => bookmark.postId);

      const postsResult = await appwriteService.getPosts([
        Query.equal("$id", postIds),
      ]);

      const posts = postsResult.documents;

      const uniqueUserIds = [...new Set(posts.map((post) => post.userId))];

      let postsWithAuthor = posts;

      if (uniqueUserIds.length > 0) {
        const authorsResult = await usersService.getUsersByIds(uniqueUserIds);

        const authorMap = {};

        authorsResult.documents.forEach((author) => {
          authorMap[author.userId] = author;
        });

        postsWithAuthor = posts.map((post) => ({
          ...post,
          author: authorMap[post.userId] || null,
        }));
      }

      return {
        posts: postsWithAuthor,
        nextPage:
          bookmarks.documents.length === limit ? pageParam + 1 : undefined,
      };
    },

    getNextPageParam: ({ nextPage }) => {
      return nextPage;
    },

    staleTime: 1000 * 60 * 5,
    maxPages: 3,
  });
};
