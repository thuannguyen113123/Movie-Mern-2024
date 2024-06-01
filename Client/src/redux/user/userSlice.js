import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  loginMethod: null,
  listFavorites: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loginMethod = action.payload.loginMethod;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
      state.listFavorites = [];
      state.loginMethod = null;
    },
    setListFavorites: (state, action) => {
      state.listFavorites = action.payload || [];
    },
    removeFavorite: (state, action) => {
      const { mediaId } = action.payload;
      state.listFavorites = state.listFavorites.filter(
        (e) => e && e.mediaId.toString() !== mediaId.toString()
      );
    },

    addFavorite: (state, action) => {
      if (!Array.isArray(state.listFavorites)) {
        state.listFavorites = [];
      }
      state.listFavorites = [action.payload, ...state.listFavorites];
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
  setListFavorites,
  addFavorite,
  removeFavorite,
} = userSlice.actions;
export default userSlice.reducer;
