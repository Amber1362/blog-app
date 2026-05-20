import React from "react";
import { Container, Logo, LogoutBtn, Button } from "../index";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { toggleTheme } from "../../store/themeSlice";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-white dark:bg-gray-900">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `${isActive ? "text-indigo-600 hover:text-indigo-600 dark:text-gray-400" : "text-black"} inline-block px-6 py-2 duration-200 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-600 hover:text-indigo-600 rounded-full dark:text-gray-200`
                    }
                  >
                    <strong>{item.name}</strong>
                  </NavLink>
                </li>
              ) : null,
            )}
            
            {authStatus && userData && (
              <li>
                <NavLink
                  to={`/profile/${userData.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "text-indigo-600 hover:text-indigo-600 dark:text-gray-400"
                        : "text-black"
                    }
        inline-block px-6 py-2 duration-200 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-600 hover:text-indigo-600 rounded-full dark:text-gray-200`
                  }
                >
                  <strong>Profile</strong>
                </NavLink>
              </li>
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}

            <li>
              <button
                onClick={() => dispatch(toggleTheme())}
                className="disabled:cursor-not-allowed disabled:opacity-50 inline-block px-6 py-2 duration-200 text-black dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-600 rounded-full font-bold hover:text-indigo-600 cursor-pointer"
              >
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </button>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
