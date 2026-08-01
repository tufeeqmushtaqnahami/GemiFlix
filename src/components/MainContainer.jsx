import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackgorund from "./VideoBackgorund";

const MainContainer = () => {
  const movie = useSelector(
    (store) => store.movies?.nowPlayingMovies?.[0]
  );

  if (!movie) return null;

  const { original_title, overview, id } = movie;

  return (
    <section
      aria-label="Featured Movie"
      className="
        relative
        w-full

        h-[60vh]
        sm:h-[65vh]
        md:h-[75vh]
        lg:h-[90vh]
        xl:h-screen
        2xl:h-screen

        overflow-hidden
        bg-black
      "
    >
      <VideoBackgorund movieId={id} />

      {/* Content */}
      <div className="absolute inset-0 z-20">
        <VideoTitle
          id={id}
          title={original_title}
          overview={overview}
        />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-black via-black/70 to-transparent" />
    </section>
  );
};

export default MainContainer;