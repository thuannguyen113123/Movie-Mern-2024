// AuthModal.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoginModalOpen,
  setSignupModalOpen,
  setUpdatePasswordModalOpen,
} from "../../redux/modal/authModalSlice";
import Login from "./Login";
import SignUp from "./SignUp";
import UpdatePassword from "./UpdatePassword";

const AuthModal = () => {
  const dispatch = useDispatch();
  const { loginModalOpen, signupModalOpen, updatePasswordModalOpen } =
    useSelector((state) => state.authModal);

  return (
    <>
      {loginModalOpen && (
        <Login onClose={() => dispatch(setLoginModalOpen(false))} />
      )}
      {signupModalOpen && (
        <SignUp
          onCloseModalSignUp={() => dispatch(setSignupModalOpen(false))}
        />
      )}
      {updatePasswordModalOpen && (
        <UpdatePassword
          onCloseModalUpdatePassword={() =>
            dispatch(setUpdatePasswordModalOpen(false))
          }
        />
      )}
    </>
  );
};

export default AuthModal;
