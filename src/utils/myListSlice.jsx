import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "./Firebase";

/*
 * Load the current user's My List from Firestore
 */
export const loadMyList = createAsyncThunk(
  "myList/loadMyList",
  async (_, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        return [];
      }

      const myListRef = collection(
        db,
        "users",
        user.uid,
        "myList"
      );

      const snapshot = await getDocs(myListRef);

      return snapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.error("Error loading My List:", error);

      return rejectWithValue(
        "Unable to load your My List."
      );
    }
  }
);

/*
 * Add a movie to the current user's My List
 */
export const addToMyList = createAsyncThunk(
  "myList/addToMyList",
  async (movie, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        return rejectWithValue(
          "Please sign in to use My List."
        );
      }

      const movieRef = doc(
        db,
        "users",
        user.uid,
        "myList",
        String(movie.id)
      );

      await setDoc(movieRef, movie);

      return movie;
    } catch (error) {
      console.error("Error adding movie to My List:", error);

      return rejectWithValue(
        "Unable to add movie to My List."
      );
    }
  }
);

/*
 * Remove a movie from the current user's My List
 */
export const removeFromMyList = createAsyncThunk(
  "myList/removeFromMyList",
  async (movieId, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        return rejectWithValue(
          "Please sign in to use My List."
        );
      }

      const movieRef = doc(
        db,
        "users",
        user.uid,
        "myList",
        String(movieId)
      );

      await deleteDoc(movieRef);

      return movieId;
    } catch (error) {
      console.error(
        "Error removing movie from My List:",
        error
      );

      return rejectWithValue(
        "Unable to remove movie from My List."
      );
    }
  }
);

const myListSlice = createSlice({
  name: "myList",

  initialState: {
    movies: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearMyList: (state) => {
      state.movies = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Load My List
      .addCase(loadMyList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loadMyList.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })

      .addCase(loadMyList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add movie
      .addCase(addToMyList.fulfilled, (state, action) => {
        const exists = state.movies.some(
          (movie) => movie.id === action.payload.id
        );

        if (!exists) {
          state.movies.push(action.payload);
        }

        state.error = null;
      })

      .addCase(addToMyList.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Remove movie
      .addCase(removeFromMyList.fulfilled, (state, action) => {
        state.movies = state.movies.filter(
          (movie) => movie.id !== action.payload
        );

        state.error = null;
      })

      .addCase(removeFromMyList.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearMyList } = myListSlice.actions;

export default myListSlice.reducer;