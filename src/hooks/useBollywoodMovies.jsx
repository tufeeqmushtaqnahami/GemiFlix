import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { API_OPTIONS } from "../utils/Constants";
import { addBollywoodMovies } from "../utils/moviesSlice";

const useBollywoodMovies = () => {
  const dispatch = useDispatch();

  const getBollywoodMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/discover/movie?with_original_language=hi&region=IN&sort_by=popularity.desc&page=1",
        API_OPTIONS
      );

      const json = await data.json();

      dispatch(addBollywoodMovies(json.results));
    } catch (error) {
      console.error("Error fetching Bollywood movies:", error);
    }
  };

useEffect(() => {
  getBollywoodMovies();

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return null;
};

export default useBollywoodMovies;