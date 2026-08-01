import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackgorund = ({ movieId }) => {
  useMovieTrailer(movieId);

  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  if (!trailerVideo) {
    return <div className="absolute inset-0 bg-black" />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Trailer */}
      <iframe
        className="
          absolute
          top-1/2
          left-1/2
          min-w-full
          min-h-full
          w-[177.77vh]
          h-[56.25vw]
          -translate-x-1/2
          -translate-y-1/2
          pointer-events-none
          scale-135
lg:scale-115
xl:scale-110
          
        "
       frameBorder="0"
src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1&loop=1&playlist=${trailerVideo.key}`}
title="Trailer"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowFullScreen
/>

     {/* Overall Dark Overlay */}
<div className="absolute inset-0 bg-black/25" />

{/* Top Gradient (NEW) */}
<div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-black via-black/70 to-transparent" />

{/* Left Gradient */}
<div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-black via-black/70 to-transparent" />

{/* Bottom Gradient */}
<div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-black via-black/80 to-transparent" /> 
    </div>
  );
};

export default VideoBackgorund;

