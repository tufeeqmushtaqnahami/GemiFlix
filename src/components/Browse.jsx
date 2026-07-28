import { useSelector } from "react-redux";

import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";
import Footer from "./Footer";
import MovieModal from "./MovieModal";
import SearchModal from "./SearchModal";

import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/UsePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";

const Browse = () => {
  const showGptSearch = useSelector(
    (store) => store.gpt.showGptSearch
  );

  // Fetch Movies
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useTrendingMovies();
  useUpcomingMovies();

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Header />

      <main className="relative w-full">
        {showGptSearch ? (
          <GptSearch />
        ) : (
          <>
            <MainContainer />
            <SecondaryContainer />
            <Footer />
          </>
        )}
      </main>

      {/* Global Modals */}
      <MovieModal />
      <SearchModal />
    </div>
  );
};

export default Browse;