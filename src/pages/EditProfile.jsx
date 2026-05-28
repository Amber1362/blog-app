import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileSetup from "./ProfileSetup";
import usersService from "../appwrite/users";

function EditProfile() {
   const [profile, setProfile] = useState(null)

   const userData = useSelector((state) => state.auth.userData)

   useEffect(() => {
      usersService.getUserProfile(userData.$id)
         .then((profile) => {
            if(profile) {
               setProfile(profile)
            }
         })
   }, [])

   return profile ? (
      <ProfileSetup profileDetails={profile} />
   ) : null
}

export default EditProfile