import { Clapperboard } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const technologies = [
  {
    name: "React",
    url: "https://react.dev",
  },
  {
    name: "Redux",
    url: "https://redux.js.org",
  },
  {
    name: "Firebase",
    url: "https://firebase.google.com",
  },
  {
    name: "Gemini AI",
    url: "https://ai.google.dev",
  },
  {
    name: "TMDB",
    url: "https://www.themoviedb.org",
  },
  {
    name: "Tailwind CSS",
    url: "https://tailwindcss.com",
  },
];

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-gradient-to-b from-zinc-900 via-black to-black">
      <div
        className="
          mx-auto
          max-w-7xl

          px-5
          sm:px-6
          md:px-8
          lg:px-10

          py-12
          sm:py-14
          lg:py-16
        "
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3 xl:gap-16">

          {/* Brand */}
          <div>
            <div className="relative inline-flex items-center gap-3 sm:gap-4">
              <div className="absolute -inset-5 rounded-full bg-red-600/10 blur-3xl"></div>

              <div className="relative flex items-center gap-3">
                <Clapperboard
                  className="text-red-600 w-9 h-9 sm:w-10 sm:h-10"
                />

                <h2
                  className="
                    text-3xl
                    sm:text-4xl
                    font-extrabold
                    tracking-tight
                    text-red-600
                  "
                >
                  GemiFlix
                </h2>
              </div>
            </div>

            <p
              className="
                mt-5
                max-w-sm

                text-sm
                sm:text-base
                lg:text-lg

                leading-7
                text-gray-400
              "
            >
              Discover thousands of movies, watch trailers,
              build your personal watchlist, and explore
              cinema with AI-powered recommendations.
            </p>
          </div>

          {/* About */}
          <div>
           <p
  className="
    text-lg
    sm:text-xl
    lg:text-2xl

    font-medium
    leading-relaxed

    text-gray-200
    mb-8
  "
>
  Designed & Developed by
  <span className="ml-2 font-bold text-red-500">
    Tufeeq Mushtaq
  </span>
</p>

            <div className="space-y-3">
              <a
                href="https://github.com/tufeeqmushtaqnahami"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex
                  items-center
                  gap-3

                  rounded-lg
                  px-3
                  py-2

                  transition-all
                  duration-300

                  hover:bg-zinc-900/60
                "
              >
                <FaGithub
                  className="text-gray-400 group-hover:text-white transition"
                  size={18}
                />

                <div>
                  <p className="text-sm font-medium text-gray-200">
                    GitHub
                  </p>

                  <p className="text-xs text-gray-500 break-all">
                    github.com/tufeeqmushtaqnahami
                  </p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/tufeeq-mushtaq-024b7a1b9/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex
                  items-center
                  gap-3

                  rounded-lg
                  px-3
                  py-2

                  transition-all
                  duration-300

                  hover:bg-zinc-900/60
                "
              >
                <FaLinkedin
                  size={18}
                  className="text-blue-500"
                />

                <div>
                  <p className="text-sm font-medium text-gray-200">
                    LinkedIn
                  </p>

                  <p className="text-xs text-gray-500 break-all">
                    linkedin.com/in/tufeeq-mushtaq
                  </p>
                </div>
              </a>

              <a
                href="mailto:tufeeqmushtaq000@gmail.com"
                className="
                  group
                  flex
                  items-center
                  gap-3

                  rounded-lg
                  px-3
                  py-2

                  transition-all
                  duration-300

                  hover:bg-zinc-900/60
                "
              >
                <MdEmail
                  size={18}
                  className="text-red-500"
                />

                <div>
                  <p className="text-sm font-medium text-gray-200">
                    Email
                  </p>

                  <p className="text-xs text-gray-500 break-all">
                    tufeeqmushtaq000@gmail.com
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h3
              className="
                text-xl
                sm:text-2xl
                font-semibold
                text-white
                mb-6
              "
            >
              Built With
            </h3>

            <div className="flex flex-wrap gap-3">
              {technologies.map((tech) => (
                <a
                  key={tech.name}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    px-4
                    py-2

                    rounded-full

                    border
                    border-zinc-700

                    bg-zinc-800/80

                    text-sm
                    text-gray-300

                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:bg-red-600
                    hover:border-red-500
                    hover:text-white
                    hover:shadow-lg
                    hover:shadow-red-600/20
                  "
                >
                  {tech.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="
            mt-12
            border-t
            border-white/10
            pt-8

            flex
            flex-col
            md:flex-row

            items-center
            justify-between

            gap-5
          "
        >
          <p
            className="
              text-center
              md:text-left

              text-sm
              text-gray-500
            "
          >
            © 2026 GemiFlix. All Rights Reserved.
          </p>

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="
              px-5
              py-2.5

              rounded-full

              bg-gradient-to-r
              from-red-600
              to-red-500

              text-white
              text-sm
              font-medium

              transition-all
              duration-300

              hover:scale-105
              hover:shadow-lg
              hover:shadow-red-600/30
            "
          >
            ↑ Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;