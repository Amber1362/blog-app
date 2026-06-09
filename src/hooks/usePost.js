import { useQuery } from "@tanstack/react-query";
import appwriteService from "../appwrite/config";
import usersService from "../appwrite/users";

export const usePost = (slug) => {
  return useQuery({
    queryKey: ["post", slug],

    queryFn: async () => {
      const post = await appwriteService.getPost(slug);

      if (!post) {
        throw new Error("Post not found");
      }

      let author = null;

      if (post.userId) {
        author = await usersService.getUserProfile(post.userId);
      }

      return {
        post,
        author,
      };
    },

    enabled: !!slug,
  });
};
