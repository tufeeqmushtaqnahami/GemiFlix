import React, { useEffect, useState, useRef } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/GptSlice";
import { openSearch } from "../utils/searchSlice";

import {
  Home,
  Search,
  Film,
  Heart,
  LogOut,
  User,
  Sparkles,
  Menu,
  X,
  ChevronDown,
  Tags,
} from "lucide-react";

const NAV_LINKS = [
  { title: "Home", icon: Home, target: "top" },
  { title: "Movies", icon: Film, target: "movies-section" },
  { title: "Genres", icon: Tags, target: "genres-section" },
  { title: "My List", icon: Heart, target: "my-list-section" },
];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const [showBackground, setShowBackground] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showDesktopDropdown, setShowDesktopDropdown] = useState(false);

  const dropdownRef = useRef(null);

  // Handle background change on scroll
  useEffect(() => {
    const handleScroll = () => setShowBackground(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDesktopDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Safe Authentication & Smart Routing Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const currentPath = window.location.pathname;

      if (currentUser) {
        const { uid, email, displayName, photoURL } = currentUser;
        dispatch(addUser({ uid, email, displayName, photoURL }));

        // Only redirect to browse if they are stuck on the login landing page
        if (currentPath === "/") {
          navigate("/browse");
        }
      } else {
        dispatch(removeUser());

        // Only redirect to landing if they are trying to access protected areas
        if (currentPath !== "/") {
          navigate("/");
        }
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleSignOut = () => {
    setShowDesktopDropdown(false);
    signOut(auth).catch(() => navigate("/error"));
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
    setShowMobileMenu(false);
  };

  const handleNavClick = (target) => {
    setShowMobileMenu(false);
    if (showGptSearch && target === "top")
      return dispatch(toggleGptSearchView());
    if (target === "top") window.scrollTo({ top: 0, behavior: "smooth" });
    else
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  };

  const UserAvatar = ({ sizeClasses }) =>
    user?.photoURL ? (
      <img
        src={user.photoURL}
        alt="Profile"
        className={`${sizeClasses} rounded-full object-cover border-2 border-white/10 shadow-sm`}
      />
    ) : (
      <div
        className={`${sizeClasses} rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold shadow-inner`}
      >
        {user?.displayName ? (
          user.displayName.substring(0, 2).toUpperCase()
        ) : (
          <User size={18} />
        )}
      </div>
    );

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-in-out ${
        showBackground
          ? "bg-black/40 backdrop-blur-2xl py-0"
          : "bg-transparent py-2"
      }`}
    >
      <div
        className=" mx-auto
    max-w-[1900px]
    2xl:max-w-[2200px]

    px-4
    sm:px-6
    lg:px-10
    xl:px-14
    2xl:px-20"
      >
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* --- Left Side --- */}
          <div
            className="flex
    items-center
    gap-3
    sm:gap-4
    lg:gap-5
    xl:gap-10
    2xl:gap-16"
          >
            {/* Mobile Hamburger: Only visible if user is logged in */}
            {user && (
              <button
                onClick={() => setShowMobileMenu(true)}
                className="lg:hidden p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-all outline-none"
                aria-label="Menu"
              >
                <Menu size={24} />
              </button>
            )}

            <h1
              onClick={() => handleNavClick("top")}
              className="text-xl sm:text-2xl md:text-3xl font-black cursor-pointer tracking-tighter select-none hover:scale-105 transition-transform duration-300"
            >
              <span className="bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent drop-shadow-sm">
                Gemi
              </span>
              <span className="text-red-600 drop-shadow-[0_0_12px_rgba(220,38,38,0.4)]">
                Flix
              </span>
            </h1>

            {/* Desktop Navigation Links: Only visible if user is logged in */}
            {user && (
              <nav
                className="hidden
    lg:flex
    items-center
    ml-2
    xl:ml-6
    2xl:ml-10
    gap-0
    xl:gap-2
    2xl:gap-4"
              >
                {NAV_LINKS.map(({ title, icon: Icon, target }) => (
                  <button
                    key={title}
                    onClick={() => handleNavClick(target)}
                    className="group
    flex
    items-center
    gap-2
    px-2
    xl:px-5
    py-2
    text-sm
    xl:text-[15px]
    font-medium
    text-gray-300
    hover:text-red-500
    rounded-lg
    hover:bg-white/5
    transition-all
    duration-300
    whitespace-nowrap"
                  >
                    <Icon
                      size={16}
                      className="opacity-70 group-hover:opacity-100 group-hover:text-red-500 transition-colors"
                    />
                    {title}
                  </button>
                ))}
              </nav>
            )}
          </div>

          {/* --- Right Side --- */}
          {user && (
            <div
              className="flex
    items-center
    gap-2
    lg:gap-3
    xl:gap-5
    2xl:gap-8"
            >
              {/* Premium Search Button */}
              <button
                onClick={() => dispatch(openSearch())}
                className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 hover:bg-white/[0.15] hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-md shadow-lg shadow-black/20 outline-none"
                aria-label="Search"
              >
                <Search
                  size={18}
                  className="text-zinc-400 group-hover:text-white transition-colors"
                />
              </button>

              {/* Magical Gemini Button */}
              <button
                onClick={handleGptSearchClick}
                className="group
  flex
  items-center
  justify-center
  px-3
py-2
lg:px-3
lg:py-2.5
xl:px-6
xl:py-3
2xl:px-8
2xl:py-3.5
  rounded-full
  bg-gradient-to-br
  from-indigo-600
  via-purple-600
  to-pink-600

  hover:brightness-110

  text-white
  font-bold
  tracking-wide

  transition-all
  duration-300

  hover:scale-105
  active:scale-95

  shadow-lg
  shadow-indigo-950/50

  hover:shadow-[0_0_35px_rgba(99,102,241,0.5)]

  outline-none

  focus-visible:ring-2
  focus-visible:ring-indigo-400
  focus-visible:ring-offset-2
  focus-visible:ring-offset-black"
              >
                <Sparkles
                  size={18}
                  className="mr-1.5 sm:mr-2 sm:w-[20px] sm:h-[20px] text-white/90 group-hover:scale-110 group-hover:rotate-45 transition-all duration-300 ease-out"
                />
                <span
                  className="text-sm
    sm:text-base
    xl:text-lg

    tracking-wide
    whitespace-nowrap
    select-none"
                >
                  <span className="sm:hidden">
                    {showGptSearch ? "Back" : "Ask Gemi"}
                  </span>
                  <span className="hidden sm:inline">
                    {showGptSearch ? "Back to Browse" : "Gemini Search"}
                  </span>
                </span>
              </button>

              {/* Desktop Interactive Profile Dropdown */}
              <div className="hidden lg:block relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDesktopDropdown(!showDesktopDropdown)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 outline-none group"
                >
                  <UserAvatar sizeClasses="w-10 h-10 xl:w-11 xl:h-11" />
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 group-hover:text-white transition-transform duration-300 ${
                      showDesktopDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu Overlay */}
                {showDesktopDropdown && (
                  <div className="absolute right-0 mt-3 w-64 bg-zinc-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2.5">
                      <p className="text-white font-bold text-base truncate">
                        {user?.displayName || "Guest"}
                      </p>
                      <p className="text-xs text-gray-400 truncate mt-0.5">
                        {user?.email}
                      </p>
                    </div>

                    <div className="h-px bg-white/10 my-2" />

                    <div className="px-2">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-red-400 hover:bg-red-600/20 hover:text-red-300 active:scale-95 transition-all duration-200"
                      >
                        <LogOut size={18} />
                        <span className="font-semibold text-sm">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      {user && (
        <div
          onClick={() => setShowMobileMenu(false)}
          className={`fixed inset-0 z-[100] lg:hidden transition-all duration-500 ${
            showMobileMenu
              ? "visible opacity-100 bg-black/60 backdrop-blur-sm"
              : "invisible opacity-0"
          }`}
        >
          <aside
            onClick={(e) => e.stopPropagation()}
            className={`fixed top-0 left-0 h-screen w-[280px] bg-zinc-950/95 backdrop-blur-2xl border-r border-white/10 shadow-[20px_0_40px_rgba(0,0,0,0.5)] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              showMobileMenu ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between p-6 pb-2">
              <h2
                onClick={() => handleNavClick("top")}
                className="text-2xl font-black tracking-tighter"
              >
                <span className="text-white">Gemi</span>
                <span className="text-red-600">Flix</span>
              </h2>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 py-4">
              <UserAvatar sizeClasses="w-14 h-14 mb-4 shadow-lg" />
              <h3 className="text-white font-bold text-lg truncate">
                {user?.displayName || "Guest"}
              </h3>
              <p className="text-sm text-gray-400 truncate">{user?.email}</p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              {NAV_LINKS.map(({ title, icon: Icon, target }) => (
                <button
                  key={title}
                  onClick={() => handleNavClick(target)}
                  className="w-full flex items-center gap-4 rounded-xl px-4 py-3.5 text-gray-300 hover:bg-white/5 hover:text-white active:scale-95 transition-all"
                >
                  <Icon size={20} className="text-gray-500" />
                  <span className="font-medium">{title}</span>
                </button>
              ))}

              <div className="h-px bg-white/5 my-4 mx-2" />

              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-4 rounded-xl px-4 py-3.5 text-red-400 hover:bg-red-600/20 hover:text-red-300 active:scale-95 transition-all"
              >
                <LogOut size={20} />
                <span className="font-medium">Sign Out</span>
              </button>
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
};

export default Header;
