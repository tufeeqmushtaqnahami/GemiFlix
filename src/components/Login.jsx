import React, { useRef, useState } from "react";
import Header from "./Header";
import { FcGoogle } from "react-icons/fc";
import { Mail, LockKeyhole, User } from "lucide-react";
import { checkValidData } from "../utils/Validate";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../utils/Firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/Constants";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

 const handleGoogleSignIn = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    setErrorMessage("Google Sign-In failed. Please try again.");
  }
};



  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);

    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;

              dispatch(
                addUser({
                  uid,
                  email,
                  displayName,
                  photoURL,
                }),
              );
            })
            .catch((error) => {
              setErrorMessage(
                "Unable to update your profile. Please try again.",
              );
            });
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              setErrorMessage("An account with this email already exists.");
              break;

            case "auth/invalid-email":
              setErrorMessage("Please enter a valid email address.");
              break;

            case "auth/weak-password":
              setErrorMessage("Password should be at least 6 characters long.");
              break;

            default:
              setErrorMessage(
                "Unable to create your account. Please try again.",
              );
          }
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then(() => {})
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-credential":
              setErrorMessage("Incorrect email or password.");
              break;

            case "auth/user-not-found":
              setErrorMessage("No account found with this email.");
              break;

            case "auth/wrong-password":
              setErrorMessage("Incorrect password.");
              break;

            case "auth/invalid-email":
              setErrorMessage("Please enter a valid email address.");
              break;

            case "auth/too-many-requests":
              setErrorMessage(
                "Too many failed attempts. Please try again later.",
              );
              break;

            default:
              setErrorMessage("Something went wrong. Please try again.");
          }
        });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img
          src={BG_URL}
          alt="background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80"></div>
      </div>

      {/* Form Container */}
      <div className="flex-grow flex items-center justify-center px-4 py-24">
        <form
          style={{
            animation: "cardFade 0.8s ease",
          }}
          onSubmit={(e) => e.preventDefault()}
          className="
w-[92%]
sm:w-[85%]
md:w-[75%]
lg:w-[400px]
xl:w-[420px]

bg-black/55
backdrop-blur-2xl
border
border-white/10
rounded-3xl

shadow-[0_20px_60px_rgba(0,0,0,0.65)]

p-5
sm:p-5
md:p-6
lg:p-7

transition-all
duration-500
animate-loginCard
"
        >
          <div className="text-center mb-5">
            <h1 className="text-white text-4xl font-extrabold">
              {isSignInForm ? "Welcome Back 👋" : "Create Account"}
            </h1>

            <p className="text-gray-400 mt-3 text-sm">
              {isSignInForm
                ? "Continue your movie experience with GemiFlix."
                : "Join GemiFlix and discover movies powered by Gemini AI."}
            </p>
          </div>

          {!isSignInForm && (
            <div className="relative mb-4">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="w-full pl-12 pr-4 py-4 bg-gray-800/70 border border-gray-700 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
          )}

          <div className="relative mb-4">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              ref={email}
              type="email"
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-4 bg-gray-800/70 border border-gray-700 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div className="relative">
            <LockKeyhole
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-4 bg-gray-800/70 border border-gray-700 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}

          <button
            onClick={handleButtonClick}
            className="
    group
    relative
    w-full
    overflow-hidden
    rounded-xl
    bg-gradient-to-r
    from-red-600
    via-red-500
    to-red-600
    py-4
    mt-6
    font-semibold
    text-white
    text-lg
    transition-all
    duration-300
    hover:scale-[1.02]
    hover:shadow-[0_0_35px_rgba(239,68,68,0.45)]
    active:scale-95
  "
          >
            {/* Shine Effect */}
            <span
              className="
      absolute
      inset-0
      -translate-x-full
      bg-gradient-to-r
      from-transparent
      via-white/20
      to-transparent
      group-hover:translate-x-full
      transition-transform
      duration-1000
    "
            />

            <span className="relative z-10">
              {isSignInForm ? "Sign In" : "Create Account"}
            </span>
          </button>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-700"></div>

            <span className="mx-4 text-gray-400 text-sm font-medium">OR</span>

            <div className="flex-1 h-px bg-gray-700"></div>
          </div>


<button
  type="button"
  onClick={handleGoogleSignIn}
  className="
    w-full
    flex
    items-center
    justify-center
    gap-3
    py-4
    rounded-xl
    bg-white
    text-gray-900
    font-semibold
    transition-all
    duration-300
    hover:bg-gray-100
    hover:scale-[1.02]
    active:scale-95
    shadow-lg
  "
>
  <FcGoogle size={24} />

  Continue with Google
</button>
<div className="mt-6"></div>
          <p
            className="text-gray-500 text-center mt-6 cursor-pointer hover:text-white transition-all"
            onClick={toggleSignInForm}
          >
            {isSignInForm
              ? "New to GemiFlix? Sign Up Now"
              : "Already Registered? Sign In Now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
