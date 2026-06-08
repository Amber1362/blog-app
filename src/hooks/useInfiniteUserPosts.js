import { useInfiniteQuery } from "@tanstack/react-query";
import { Query } from "appwrite";
import appwriteService from "../appwrite/config";
import usersService from "../appwrite/users";

export const useInfiniteUserPosts = (userId, limit = 8) => {
  return useInfiniteQuery({
    queryKey: ["user-posts", userId],

    enabled: !!userId,

    queryFn: async ({ pageParam = 1 }) => {
      const result = await appwriteService.getPosts([
        Query.equal("userId", userId),
        Query.limit(limit),
        Query.offset((pageParam - 1) * limit),
      ]);

      const posts = result.documents;

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
        nextPage: posts.length === limit ? pageParam + 1 : undefined,
      };
    },

    getNextPageParam: ({ nextPage }) => {
      return nextPage;
    },

    staleTime: 1000 * 60 * 5,
  });
};
