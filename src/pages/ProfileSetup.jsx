import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, Logo } from "../components";
import usersService from "../appwrite/users";
import { login } from "../store/authSlice";
import toast from "react-hot-toast";
import appwriteService from "../appwrite/config";
import { FaPenToSquare } from "react-icons/fa6";
import handleError from "../utils/handleError";

function ProfileSetup({ profileDetails }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: profileDetails?.username || "",
      bio: profileDetails?.bio || "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  const [previewImage, setPreviewImage] = useState(
    profileDetails?.profilePhoto
      ? appwriteService.getFilePreview(profileDetails.profilePhoto)
      : null,
  );

  const imageFile = watch("image");

  useEffect(() => {
    if (!imageFile?.[0]) return;

    const objectUrl = URL.createObjectURL(imageFile[0]);

    setPreviewImage(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [imageFile]);

  const bioValue = watch("bio", "");

  const submit = async (data) => {
    setIsLoading(true);
    try {
      if (profileDetails) {
        const file = data.image?.[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file && profileDetails.profilePhoto) {
          await appwriteService.deleteFile(profileDetails.profilePhoto);
        }

        const { image, ...profileData } = data;

        const updatedProfile = await usersService.updateUserProfile(
          profileDetails.$id,
          {
            ...profileData,
            profilePhoto: file ? file.$id : profileDetails.profilePhoto,
          },
        );

        if (updatedProfile) {
          dispatch(
            login({
              userData: {
                ...userData,
                profilePhoto: updatedProfile.profilePhoto,
                username: updatedProfile.username,
                bio: updatedProfile.bio,
                profileComplete: updatedProfile.profileComplete,
              },
            }),
          );
          toast.success("Profile updated successfully");
          navigate(
            `/profile/${updatedProfile.username.toLowerCase().replace(/\s+/g, "-") || userData.username.toLowerCase().replace(/\s+/g, "-")}`,
          );
        }
      } else {
        const file = data.image?.[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) {
          const fileId = file.$id;
          data.profilePhoto = fileId;
        }

        const profile = await usersService.getUserProfile(userData.$id);

        const { image, ...profileData } = data;

        const updatedProfile = await usersService.updateUserProfile(
          profile.$id,
          {
            ...profileData,
            profilePhoto: file ? file.$id : profile?.profilePhoto,
            profileComplete: true,
          },
        );

        dispatch(
          login({
            userData: {
              ...userData,
              profilePhoto: updatedProfile.profilePhoto,
              username: updatedProfile.username,
              bio: updatedProfile.bio,
              profileComplete: updatedProfile.profileComplete,
            },
          }),
        );

        toast.success("Profile setup complete!");

        navigate(
          `/profile/${updatedProfile.username.toLowerCase().replace(/\s+/g, "-")}`,
        );
      }
    } catch (error) {
      handleError(error, "Failed to complete profile setup");
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
                <div className="block">
                  <div className="flex justify-center">
                    <div className="relative w-32 h-32">
                      {/* Profile Image */}
                      <div className="w-full h-full rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg bg-indigo-100 dark:bg-gray-600 flex items-center justify-center">
                        {previewImage ? (
                          <img
                            src={previewImage}
                            alt="Profile Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <i className="fa-regular fa-circle-user text-7xl text-indigo-600 dark:text-gray-300"></i>
                        )}
                      </div>

                      {/* Hidden File Input */}
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        id="profilePhotoInput"
                        className="hidden"
                        {...register("image")}
                      />

                      {/* Pencil Button */}
                      <label
                        htmlFor="profilePhotoInput"
                        className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center cursor-pointer shadow-md border-2 border-white dark:border-gray-700 transition"
                      >
                        <FaPenToSquare className="text-sm" />
                      </label>
                    </div>
                  </div>
                </div>

                {/* {profileDetails?.profilePhoto && (
                  <img
                    src={appwriteService.getFilePreview(
                      profileDetails.profilePhoto,
                    )}
                    alt={profileDetails.username}
                    className="w-20 h-20 rounded-full object-cover mt-3"
                  />
                )} */}

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
                {profileDetails ? "Update Profile" : "Complete Setup"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProfileSetup;
