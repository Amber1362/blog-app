import { useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/auth";
import { useEffect } from "react";
import { login, logout, setLoading } from "./store/authSlice";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import usersService from "./appwrite/users";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    authService
      .getCurrentUser()
      .then((userData) => {
         return usersService
          .getUserProfile(userData.$id)
          .then(async (profile) => {
            if (!profile) {
              // new user (Google OAuth or legacy) — create profile
              profile = await usersService.createUserProfile({
                userId: userData.$id,
                name: userData.name,
              });
            }
            dispatch(
              login({
                userData: {
                  $id: userData.$id,
                  name: userData.name,
                  email: userData.email,
                  profilePhoto: profile?.profilePhoto || null,
                  username: profile?.username || "",
                  bio: profile?.bio || "",
                  profileComplete: profile?.profileComplete || false,
                },
              }),
            );
            if (!profile?.profileComplete) {
              navigate("/profile-setup");
              return;
            }
          });
      })
      .catch((error) => {
        console.log(error);

        if (error.message?.includes("Failed to fetch") || !navigator.onLine) {
          return;
        }

        if (error.code === 401) {
          dispatch(logout());
        }
      })
      .finally(() => {
        dispatch(setLoading(false));
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const root = document.body;

    if (theme === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, [theme]);

  useEffect(() => {
    const handleOffline = () => {
      toast.error("Internet disconnected", {
        id: "network-status",
      });
    };

    const handleOnline = () => {
      toast.success("Back online", {
        id: "network-status",
      });
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return !isLoading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-200 dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white">
      <div className="w-full block">
        <Toaster position="top-right" />
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
