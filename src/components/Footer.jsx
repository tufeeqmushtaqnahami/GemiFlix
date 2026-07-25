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
    <footer className="mt-20 bg-gradient-to-b from-zinc-900 via-black to-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          {/* Brand */}
          <div>
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-red-600/10 blur-3xl rounded-full"></div>

              <div className="relative flex items-center gap-3">
                <span className="text-4xl">🎬</span>

                <h2 className="text-4xl font-extrabold tracking-tight text-red-600">
                  GemiFlix
                </h2>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-gray-400 text-lg leading-8">
              Discover thousands of movies, watch trailers, build your personal
              watchlist, and explore films with AI-powered recommendations.
            </p>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white text-2xl font-semibold mb-6">
              Connect With Me
            </h3>

            <div className="space-y-5">
              <a
                href="https://github.com/tufeeqmushtaqnahami"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition duration-300"
              >
                💻 GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/tufeeq-mushtaq-024b7a1b9/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition duration-300"
              >
                💼 LinkedIn
              </a>

              <a
                href="mailto:tufeeqmushtaq000@gmail.com"
                className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition duration-300"
              >
                📧 Email Me
              </a>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-white text-2xl font-semibold mb-6">
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
                    bg-zinc-800
                    border
                    border-zinc-700
                    text-gray-300
                    text-sm
                    transition-all
                    duration-300
                    hover:bg-red-600
                    hover:border-red-500
                    hover:text-white
                    hover:-translate-y-1
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

        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-sm">
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
              px-6
              py-3
              rounded-full
              bg-gradient-to-r
              from-red-600
              to-red-500
              text-white
              font-medium
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-xl
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