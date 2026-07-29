import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",

  initialState: {
    isOpen: false,
    movieId: null,
    modalType: "details", // "details" | "trailer"
  },

  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.movieId = action.payload.movieId;
      state.modalType = action.payload.modalType || "details";
    },

    closeModal: (state) => {
      state.isOpen = false;
      state.movieId = null;
      state.modalType = "details";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;