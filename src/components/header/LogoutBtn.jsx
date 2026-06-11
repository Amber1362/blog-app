import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";
import { Popup } from "../index";
import toast from "react-hot-toast";
import handleError from "../../utils/handleError";
import { AnimatePresence } from "framer-motion";

function LogoutBtn({ className = "" }) {
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = () => {
    setPopup(true);
  };

  return (
    <>
      <AnimatePresence>
        {popup && (
          <Popup
            para="Are you sure you want to logout?"
            onConfirm={() => {
              setIsLoading(true);
              authService
                .logout()
                .then(() => {
                  dispatch(logout());
                  toast.success("You are logged out.");
                  navigate("/");
                })
                .catch((error) => {
                  handleError(error, "Failed to logout");
                })
                .finally(() => {
                  setIsLoading(false);
                  setPopup(false);
                });
            }}
            onCancel={() => {
              setPopup(false);
            }}
          />
        )}
      </AnimatePresence>

      {isLoading && (
        <div className="z-50 cursor-not-allowed fixed inset-0 bg-black/30 flex justify-center items-center">
          <Spinner />
        </div>
      )}

      <div>
        <button
          disabled={isLoading}
          className={`${className} disabled:cursor-not-allowed disabled:opacity-50`}
          onClick={logoutHandler}
        >
          {isLoading ? <Spinner /> : "Logout"}
        </button>
      </div>
    </>
  );
}

export default LogoutBtn;
