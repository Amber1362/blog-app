import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, Logo } from "../components";
import usersService from "../appwrite/users";
import { login } from "../store/authSlice";
import toast from "react-hot-toast";

function ProfileSetup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  const bioValue = watch("bio", "");

  const submit = async (data) => {
    setIsLoading(true);
    try {
      const profile = await usersService.getUserProfile(userData.$id);
      const updatedProfile = await usersService.updateUserProfile(profile.$id, {
        username: data.username,
        bio: data.bio,
        profileComplete: true,
      });
      dispatch(
        login({
          userData: {
            ...userData,
            username: updatedProfile.username,
            bio: updatedProfile.bio,
            profileComplete: updatedProfile.profileComplete,
          },
        }),
      );
      toast.success("Profile setup complete!");
      navigate(`/profile/${updatedProfile.username.toLowerCase().replace(/\s+/g, "-") || userData.username.toLowerCase().replace(/\s+/g, '-')}`);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="z-50 cursor-not-allowed fixed inset-0 bg-black/30 flex justify-center items-center"></div>
      )}

      <div className="flex items-center justify-center w-full px-4 py-8">
        <div className="mx-auto w-full max-w-lg bg-white dark:bg-gray-700 rounded-2xl p-6 sm:p-10 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>

          <h2 className="text-center text-black dark:text-gray-200 text-2xl font-bold">
            Set up your profile
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            Tell the world a little about yourself
          </p>

          <form onSubmit={handleSubmit(submit)} className="mt-8">
            <div className="space-y-5">
              <div className="block">
                <Input
                  label="Username:"
                  placeholder="Enter your username"
                  className="shadow-sm dark:bg-gray-600 dark:border-gray-600 dark:text-gray-200"
                  {...register("username", {
                    required: "Username is required.",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters.",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message:
                        "Username can only contain letters, numbers and underscores.",
                    },
                  })}
                />
                {errors.username && (
                  <p className="text-sm text-red-500 dark:text-red-400 text-left mt-2">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="block">
                <label className="inline-block mb-2 pl-4 dark:text-gray-200">
                  Bio:
                </label>
                <textarea
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="px-3 py-2 rounded-lg bg-white dark:bg-gray-600 dark:border-gray-600  dark:text-gray-200 text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full shadow-sm resize-none"
                  {...register("bio", {
                    maxLength: {
                      value: 300,
                      message: "Bio must be under 300 characters.",
                    },
                  })}
                />
                <p className="text-xs text-gray-400 text-right mt-1">
                  {bioValue?.length || 0}/300
                </p>
                {errors.bio && (
                  <p className="text-sm text-red-500 dark:text-red-400 text-left mt-2">
                    {errors.bio.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full flex justify-center cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Complete Setup
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProfileSetup;
