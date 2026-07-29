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
        h-[55vh]
        sm:h-[60vh]
        md:h-[70vh]
        lg:h-[85vh]
        xl:min-h-screen
        overflow-hidden
        bg-black
      "
    >
      <VideoBackgorund movieId={id} />

      <div className="absolute inset-0 z-20">
        <VideoTitle
          id={id}
          title={original_title}
          overview={overview}
        />
      </div>
    </section>
  );
};

export default MainContainer;