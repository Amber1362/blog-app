import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { toggleTheme } from "../../store/themeSlice";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
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

          {/* Desktop Nav — hidden on mobile */}
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
              ) : null
            )}
          </ul>

          {/* Desktop Right Side — hidden on mobile */}
          <ul className="hidden sm:flex items-center gap-2">
            {authStatus && userData && (
              <li>
                <NavLink to={`/profile/${userData.username.toLowerCase().replace(/\s+/g, "-")}`}>
                  <div className='w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold cursor-pointer hover:bg-indigo-700'>
                    {userData.name.charAt(0).toUpperCase()}
                  </div>
                </NavLink>
              </li>
            )}
            {authStatus && (
              <li><LogoutBtn /></li>
            )}
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

        {/* Mobile Menu — shows when hamburger clicked */}
        {menuOpen && (
          <div className="sm:hidden mt-3 pb-3 border-t border-gray-100 dark:border-gray-700">
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
                ) : null
              )}
              {authStatus && userData && (
                <li>
                  <NavLink
                    to={`/profile/${userData.username.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-black dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-lg font-medium"
                  >
                    Profile
                  </NavLink>
                </li>
              )}
              {authStatus && (
                <li className="">
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        )}

      </Container>
    </header>
  );
}

export default Header;