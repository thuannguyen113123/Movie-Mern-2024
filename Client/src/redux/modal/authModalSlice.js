import { createSlice } from "@reduxjs/toolkit";

export const authModalSlice = createSlice({
  name: "AuthModal",
  initialState: {
    loginModalOpen: false,
    signupModalOpen: false,
    updatePasswordModalOpen: false,
  },
  reducers: {
    setLoginModalOpen: (state, action) => {
      state.loginModalOpen = action.payload;
    },
    setSignupModalOpen: (state, action) => {
      state.signupModalOpen = action.payload;
    },
    setUpdatePasswordModalOpen: (state, action) => {
      state.updatePasswordModalOpen = action.payload;
    },
  },
});

export const {
  setLoginModalOpen,
  setSignupModalOpen,
  setUpdatePasswordModalOpen,
} = authModalSlice.actions;

export default authModalSlice.reducer;
