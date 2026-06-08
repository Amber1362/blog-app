import { useQuery } from "@tanstack/react-query";
import usersService from "../appwrite/users";

export const useProfile = (username) => {
  return useQuery({
    queryKey: ["profile", username],

    queryFn: async () => {
      return await usersService.getUserByUsername(username);
    },

    enabled: !!username,

    staleTime: 1000 * 60 * 5,
  });
};
