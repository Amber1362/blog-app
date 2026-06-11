import React, { useState, useRef, useEffect } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { toggleTheme } from "../../store/themeSlice";
import {
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaUser,
  FaBookmark,
  FaPlus,
  FaSignOutAlt,
  FaNewspaper,
} from "react-icons/fa";
import appwriteService from "../../appwrite/config";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
  ];

  return (
    <header className="sticky top-0 z-50 py-3 shadow bg-white dark:bg-gray-900">
      <Container>
        <nav className="flex items-center">
          {/* Logo */}
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden sm:flex flex-1 justify-center">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-black dark:text-gray-200"} inline-block px-6 py-2 duration-200 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-indigo-600 rounded-full font-medium`
                    }
                  >
                    <strong>{item.name}</strong>
                  </NavLink>
                </li>
              ) : null,
            )}
          </ul>

          {/* Desktop Right Side */}
          <ul className="hidden sm:flex items-center gap-2">
            {/* Profile Dropdown */}
            {authStatus && userData && (
              <li className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer duration-200"
                >
                  {userData?.profilePhoto ? (
                    <img
                      src={appwriteService.getFilePreview(
                        userData.profilePhoto,
                      )}
                      alt={userData.username}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">
                      {userData.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {userData.name}
                  </span>
                  <motion.span
                    animate={{
                      rotate: dropdownOpen ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.25,
                      ease: "easeOut",
                    }}
                    className="text-gray-400 text-xs"
                  >
                    ▼
                  </motion.span>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                      className="absolute right-0 top-12 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden"
                    >
                      {/* User Info */}
                      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        {userData?.profilePhoto ? (
                          <img
                            src={appwriteService.getFilePreview(
                              userData.profilePhoto,
                            )}
                            alt={userData.username}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">
                            {userData.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                            {userData.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate w-32">
                            {userData.email}
                          </p>
                        </div>
                      </div>

                      {/* Links */}
                      <div className="py-2">
                        <Link
                          to={`/profile/${userData.username}`}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <FaNewspaper size={14} className="text-gray-400" />
                          My Posts
                        </Link>
                        <Link
                          to="/add-post"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <FaPlus size={14} className="text-gray-400" />
                          Create Post
                        </Link>
                        <Link
                          to={`/profile/${userData.username}`}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <FaUser size={14} className="text-gray-400" />
                          Profile
                        </Link>
                        <Link
                          to="/bookmarks"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <FaBookmark size={14} className="text-gray-400" />
                          Bookmarks
                        </Link>
                      </div>

                      {/* Sign out */}
                      <div className="border-t border-gray-100 dark:border-gray-700 py-2">
                        <LogoutBtn className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-gray-50 dark:hover:bg-gray-700 text-left" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )}

            {/* Theme Toggle */}
            <li>
              <button
                onClick={() => dispatch(toggleTheme())}
                className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 text-black dark:text-gray-200 cursor-pointer duration-200"
              >
                {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
              </button>
            </li>
          </ul>

          {/* Mobile Right — theme + hamburger */}
          <div className="flex sm:hidden items-center gap-2 ml-auto">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 text-black dark:text-gray-200 cursor-pointer duration-200"
            >
              {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 text-black dark:text-gray-200 cursor-pointer duration-200"
            >
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              className="sm:hidden mt-3 pb-3 border-t border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <ul className="flex flex-col">
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      <NavLink
                        to={item.slug}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-black dark:text-gray-200"} block px-4 py-3 duration-200 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-indigo-600 rounded-lg font-medium`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ) : null,
                )}
                {authStatus && userData && (
                  <>
                    <li>
                      <Link
                        to={`/profile/${userData.username}`}
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-3 text-black dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-lg font-medium"
                      >
                        My Posts
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/add-post"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-3 text-black dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-lg font-medium"
                      >
                        Create Post
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/bookmarks"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-3 text-black dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-lg font-medium"
                      >
                        Bookmarks
                      </Link>
                    </li>
                    <li>
                      <LogoutBtn className="block w-full text-left px-4 py-3 text-red-500 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-lg font-medium" />
                    </li>
                  </>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}

export default Header;
