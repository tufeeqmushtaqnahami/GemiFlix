import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";
import Footer from "./Footer";
import MovieModal from "./MovieModal";
import SearchModal from "./SearchModal";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { clearMyList, loadMyList } from "../utils/myListSlice";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/UsePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useBollywoodMovies from "../hooks/useBollywoodMovies";

const Browse = () => {
  const dispatch = useDispatch();

  const showGptSearch = useSelector(
    (store) => store.gpt.showGptSearch
  );

  // Fetch Movies
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useTrendingMovies();
  useUpcomingMovies();
  useBollywoodMovies();

  // Load current user's My List
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(loadMyList());
    } else {
      dispatch(clearMyList());
    }
  });

  return () => unsubscribe();
}, [dispatch]);

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