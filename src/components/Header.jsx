import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
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
} from "lucide-react";

const NAV_LINKS = [
  { title: "Home", icon: Home, target: "top" },
  { title: "Movies", icon: Film, target: "movies-section" },
  { title: "Genres", icon: Film, target: "genres-section" },
  { title: "My List", icon: Heart, target: "my-list-section" },
];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const [showBackground, setShowBackground] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackground(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { uid, email, displayName, photoURL } = currentUser;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleSignOut = () => signOut(auth).catch(() => navigate("/error"));

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
    setShowMobileMenu(false);
  };

  const handleNavClick = (target) => {
    setShowMobileMenu(false);
    if (showGptSearch && target === "top") return dispatch(toggleGptSearchView());
    if (target === "top") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  };

  const UserAvatar = ({ sizeClasses }) =>
    user?.photoURL ? (
      <img
        src={user.photoURL}
        alt="Profile"
        className={`${sizeClasses} rounded-full object-cover border-2 border-white/10 shadow-sm`}
      />
    ) : (
      <div className={`${sizeClasses} rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold shadow-inner`}>
        {user?.displayName ? user.displayName.substring(0, 2).toUpperCase() : <User size={18} />}
      </div>
    );

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-in-out ${
        showBackground
          ? "bg-black/75 backdrop-blur-xl border-b border-white/5 shadow-2xl py-0"
          : "bg-gradient-to-b from-black/95 via-black/50 to-transparent py-2"
      }`}
    >
      {/* 1. Added explicit horizontal container margins (px-4 sm:px-8) */}
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* --- Left Side --- */}
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-10">
            <button
              onClick={() => setShowMobileMenu(true)}
              className="lg:hidden p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-all outline-none"
              aria-label="Menu"
            >
              <Menu size={24} />
            </button>

            <h1
              onClick={() => navigate("/browse")}
              className="text-xl sm:text-2xl md:text-3xl font-black cursor-pointer tracking-tighter select-none hover:scale-105 transition-transform duration-300"
            >
              <span className="bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent drop-shadow-sm">Gemi</span>
              <span className="text-red-600 drop-shadow-[0_0_12px_rgba(220,38,38,0.4)]">Flix</span>
            </h1>

            {/* Desktop Nav */}
            {user && (
              <nav className="hidden lg:flex items-center gap-2 ml-4">
                {NAV_LINKS.map(({ title, icon: Icon, target }) => (
                  <button
                    key={title}
                    onClick={() => handleNavClick(target)}
                    className="group flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300"
                  >
                    <Icon size={16} className="opacity-70 group-hover:opacity-100 group-hover:text-red-500 transition-colors" />
                    {title}
                  </button>
                ))}
              </nav>
            )}
          </div>

          {/* --- Right Side --- */}
          {user && (
            // 2. Increased gap here to gap-5 sm:gap-6 to space out Search and Ask Gemi
            <div className="flex items-center gap-5 sm:gap-6">
              
              {/* Premium Search Button */}
              <button
                onClick={() => dispatch(openSearch())}
                className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 hover:bg-white/[0.15] hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-md shadow-lg shadow-black/20 outline-none"
                aria-label="Search"
              >
                <Search size={18} className="text-zinc-400 group-hover:text-white transition-colors" />
              </button>

              {/* Magical Gemini Button */}
                  <button
  onClick={handleGptSearchClick}
  className="group flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3.5 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 hover:brightness-110 text-white font-bold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-indigo-950/50 hover:shadow-[0_0_35px_rgba(99,102,241,0.5)] outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
>
  <Sparkles 
    size={18} 
    className="mr-1.5 sm:mr-2 sm:w-[20px] sm:h-[20px] text-white/90 group-hover:scale-110 group-hover:rotate-45 transition-all duration-300 ease-out" 
  />
  <span className="text-sm sm:text-base tracking-wide whitespace-nowrap select-none">
    {/* Mobile Text */}
    <span className="sm:hidden">
      {showGptSearch ? "Back" : "Ask Gemi"}
    </span>
    
    {/* Desktop Text */}
    <span className="hidden sm:inline">
      {showGptSearch ? "Back to Browse" : "Gemini Search"}
    </span>
  </span>
</button>
            </div>
          )}
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      <div
        onClick={() => setShowMobileMenu(false)}
        className={`fixed inset-0 z-[100] lg:hidden transition-all duration-500 ${
          showMobileMenu ? "visible opacity-100 bg-black/60 backdrop-blur-sm" : "invisible opacity-0"
        }`}
      >
        <aside
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-0 left-0 h-screen w-[280px] bg-zinc-950/95 backdrop-blur-2xl border-r border-white/10 shadow-[20px_0_40px_rgba(0,0,0,0.5)] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            showMobileMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-6 pb-2">
            <h2 onClick={() => handleNavClick("top")} className="text-2xl font-black tracking-tighter">
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
            <h3 className="text-white font-bold text-lg truncate">{user?.displayName || "Guest"}</h3>
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
    </header>
  );
};

export default Header;