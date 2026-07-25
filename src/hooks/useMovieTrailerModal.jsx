import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/Constants";

const useMovieTrailerModal = (movieId) => {
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const getTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          API_OPTIONS
        );

        const json = await response.json();

        const officialTrailer = json.results?.find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer" &&
            video.official
        );

        if (officialTrailer) {
          setTrailerKey(officialTrailer.key);
          return;
        }

        const trailer = json.results?.find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer"
        );

        if (trailer) {
          setTrailerKey(trailer.key);
          return;
        }

        const youtubeVideo = json.results?.find(
          (video) => video.site === "YouTube"
        );

        if (youtubeVideo) {
          setTrailerKey(youtubeVideo.key);
        }
      } catch (error) {
        console.error("Trailer Fetch Error:", error);
      }
    };

    getTrailer();
  }, [movieId]);

  return trailerKey;
};

export default useMovieTrailerModal;