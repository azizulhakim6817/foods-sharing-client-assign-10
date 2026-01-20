import { Link, NavLink, useNavigate } from "react-router";
import logo from "../assets/logo.png";
import { FaRegCircleUser } from "react-icons/fa6";
import { LogOut, CopyPlus, Bookmark, Save } from "lucide-react";
import { toast } from "react-toastify";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, signOutUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  //! logout
  const handlesignOutUser = () => {
    signOutUser();
    toast.success("Log out successful");
    navigate("/login");
  };

  //! outside click close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //! nav links--------------------
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-[#F06225] font-bold bg-gray-100" : "font-medium"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/available-foods"
          className={({ isActive }) =>
            isActive ? "text-[#F06225] font-bold bg-gray-100" : "font-medium"
          }
        >
          Available Foods
        </NavLink>
      </li>
    </>
  );

  //! theme toggle switch button ---------
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "winter");
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  //* handle Theme button------------
  const handleTheme = (checked) => {
    setTheme(checked ? "night" : "winter");
  };

  return (
    <div className="navbar px-4 md:px-12 bg-base-100 shadow-sm">
      {/* left */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            ☰
          </label>
          <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-40">
            {links}
          </ul>
        </div>

        <Link to="/" className="flex gap-2 items-center">
          <img src={logo} alt="logo" className="w-8 h-8 md:w-10 md:h-10" />
          <span className="hidden md:block text-2xl font-bold">
            FOOD🔸SHARE
          </span>
        </Link>
      </div>

      {/* center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">{links}</ul>
      </div>

      {/* right */}
      <div className="navbar-end">
        {/* Toggle (switch) -----------*/}
        <div className="mr-2">
          <input
            type="checkbox"
            onChange={(e) => handleTheme(e.target.checked)}
            defaultChecked
            className="toggle"
          />
        </div>
        {user ? (
          <div className="relative" ref={dropdownRef}>
            {/* avatar */}
            <button onClick={() => setOpen(!open)}>
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="user"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <FaRegCircleUser size={32} />
              )}
            </button>

            {/* dropdown */}
            {open && (
              <ul className="menu absolute right-0 mt-2 w-52 bg-base-100 rounded-box shadow-md z-50 space-y-1">
                <li onClick={() => setOpen(false)}>
                  <NavLink to="/add-food">
                    <CopyPlus /> Add Food
                  </NavLink>
                </li>

                <li onClick={() => setOpen(false)}>
                  <NavLink to="/manage-my-foods">
                    <Bookmark /> Manage My Foods
                  </NavLink>
                </li>

                <li onClick={() => setOpen(false)}>
                  <NavLink to="/my-food-requests">
                    <Save /> My Food Requests
                  </NavLink>
                </li>

                <li>
                  <button
                    onClick={() => {
                      handlesignOutUser();
                      setOpen(false);
                    }}
                    className="text-red-600"
                  >
                    <LogOut /> Log out
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link to="/login" className="btn bg-[#F06225] text-white">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
