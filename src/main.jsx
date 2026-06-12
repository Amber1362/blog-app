import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/store";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import AddPost from "./pages/AddPost";
import Signup from "./pages/Signup";
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import AllPosts from "./pages/AllPosts";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import {
  PrivacyPolicy,
  TermsAndConditions,
  Features,
  AuthLayout,
  ContactSection,
  AboutVella,
  FAQ,
} from "./components/index.js";
import Profile from "./pages/Profile.jsx";
import ProfileSetup from "./pages/ProfileSetup.jsx";
import "react-loading-skeleton/dist/skeleton.css";
import EditProfile from "./pages/EditProfile.jsx";
import BookmarkedPosts from "./pages/Bookmark.jsx";

import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/faq" element={<FAQ />} />
      <Route path="/about-vella" element={<AboutVella />} />
      <Route path="/contact" element={<ContactSection />} />
      <Route path="/features" element={<Features />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route index element={<Home />} />
      <Route
        path="/login"
        element={
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        }
      />
      <Route path="/all-posts" element={<AllPosts />} />
      <Route
        path="/add-post"
        element={
          <AuthLayout authentication={true}>
            <AddPost />
          </AuthLayout>
        }
      />
      <Route
        path="/edit-post/:slug"
        element={
          <AuthLayout authentication={true}>
            <EditPost />
          </AuthLayout>
        }
      />
      <Route path="/post/:slug" element={<Post />} />
      <Route
        path="/forgot-password"
        element={
          <AuthLayout authentication={false}>
            <ForgotPassword />
          </AuthLayout>
        }
      />
      <Route
        path="/reset-password"
        element={
          <AuthLayout authentication={false}>
            <ResetPassword />
          </AuthLayout>
        }
      />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/bookmarks" element={<BookmarkedPosts />} />
      <Route
        path="/profile-setup"
        element={
          <AuthLayout authentication={true}>
            <ProfileSetup />
          </AuthLayout>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <AuthLayout authentication={true}>
            <EditProfile />
          </AuthLayout>
        }
      />
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    </PersistGate>
  </Provider>,
  // </StrictMode>,
);
