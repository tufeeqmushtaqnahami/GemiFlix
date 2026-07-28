import React, { useEffect, useRef, useState } from "react";
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
  ChevronDown,
  User,
  Sparkles,
} from "lucide-react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const [showBackground, setShowBackground] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackground(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch(() => navigate("/error"));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;

        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL,
          })
        );

        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
        showBackground
          ? "bg-[#141414]/95 backdrop-blur-md shadow-xl"
          : "bg-gradient-to-b from-black via-black/70 to-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-10">
        <div className="flex items-center justify-between h-20">

          {/* Left Side */}
          <div className="flex items-center gap-12">

            <h1
              onClick={() => navigate("/browse")}
              className="text-3xl font-extrabold cursor-pointer tracking-tight select-none"
            >
              <span className="text-white">Gemi</span>
              <span className="text-red-500">Flix</span>
            </h1>

            {user && (
              <nav className="hidden lg:flex items-center gap-8">

                <button
                  onClick={() => {
                    if (showGptSearch) {
                      dispatch(toggleGptSearchView());
                    } else {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="flex items-center gap-2 text-white hover:text-red-500 transition"
                >
                  <Home size={18} />
                  Home
                </button>

                <button
                  onClick={() => {
                    document
                      .getElementById("movies-section")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                  className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition"
                >
                  <Film size={18} />
                  Movies
                </button>

                <button
                  onClick={() => {
                    document
                      .getElementById("genres-section")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                  className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition"
                >
                  <Film size={18} />
                  Genres
                </button>

                <button
                  onClick={() => {
                    document
                      .getElementById("my-list-section")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                  className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition"
                >
                  <Heart size={18} />
                  My List
                </button>

              </nav>
            )}

          </div>

          {/* Right Side */}
          {user && (
            <div className="flex items-center gap-4">

              {/* Search Button */}
                        <button
                  onClick={() => dispatch(openSearch())}
                  className="
                    group
                    flex items-center justify-center
                    w-11 h-11
                    rounded-full
                    bg-white/10
                    border border-white/10
                    backdrop-blur-md
                    hover:bg-white/20
                    hover:border-white/20
                    hover:scale-110
                    active:scale-95
                    transition-all duration-300
                    shadow-lg hover:shadow-white/10
                  "
                >
                  <Search
                    size={20}
                    strokeWidth={2.5}
                    className="
                      text-white
                      transition-all duration-300
                      group-hover:rotate-12
                      group-hover:scale-110
                    "
                  />
                </button> 

              {/* Gemini Button */}
              <button
                onClick={handleGptSearchClick}
                className="
                  group
                  hidden md:flex
                  items-center gap-2
                  px-6 py-2.5
                  rounded-full
                  bg-indigo-700
                  text-white
                  font-semibold
                  hover:bg-indigo-600
                  transition-all duration-300
                  shadow-md
                  animate-[attention_8s_linear_infinite]
                "
              >
                <Sparkles
                  size={18}
                  className="transition-transform duration-300 group-hover:rotate-12"
                />

                <span>
                  {showGptSearch ? "Back to Browse" : "Ask Gemini"}
                </span>
              </button>

              {/* Profile */}
              <div
                ref={profileMenuRef}
                className="relative"
              >
                <button
                  onClick={() =>
                    setShowProfileMenu(!showProfileMenu)
                  }
                  className="flex items-center gap-2 hover:opacity-90 transition"
                >
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border border-gray-600"
                    />
                  ) : user?.displayName ? (
                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-semibold">
                      {user.displayName
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()}
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                      <User
                        size={18}
                        className="text-white"
                      />
                    </div>
                  )}

                  <ChevronDown
                    size={18}
                    className={`text-white transition-transform duration-300 ${
                      showProfileMenu
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-3 w-44 rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl overflow-hidden">

                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-red-600 transition duration-300"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>

                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;