import { Label, TextInput, Modal } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice.js";
import OAuth from "../OAuth.jsx";
import {
  setLoginModalOpen,
  setSignupModalOpen,
} from "../../redux/modal/authModalSlice.js";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { t } = useTranslation("auth");

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const showModalLogin = useSelector((state) => state.authModal.loginModalOpen);

  const { error: errorMessage } = useSelector((state) => state.user);
  // hàm xử lý khi nhấn Đăng nhập
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      return dispatch(signInFailure("Vui lòng không để trống"));
    }
    try {
      dispatch(signInStart());
      const res = await axios.post(`/auth/login`, {
        email,
        password,
      });

      const data = res.data;
      if (!data.success) {
        dispatch(signInFailure(data.message));
        toast.error(errorMessage);
      }
      if (data.success) {
        dispatch(signInSuccess(data));
        dispatch(setLoginModalOpen(false));
        navigate(location.state || "/");
        toast.success("Đăng nhập thành công");
      }
    } catch (error) {
      console.log(error);
      dispatch(signInFailure(error.message));
      toast.error("Đăng nhập thất bại");
    }
  };

  // Hàm mở modal đăng ký
  const openSignupModal = () => {
    dispatch(setSignupModalOpen(true));
    dispatch(setLoginModalOpen(false));
  };

  return (
    <>
      <Modal show={showModalLogin} onClose={onClose} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {t("login")}
            </h3>

            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="mb-2">
                <Label value="Email" />
                <TextInput
                  type="email"
                  placeholder="me@example.com"
                  className="rounded-lg"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <Label value={t("password")} />
                <TextInput
                  type="password"
                  placeholder="••••••••••"
                  className="rounded-lg"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex-1">
                <button className="bg-black w-full p-2 rounded-full hover:bg-[#1d1d1d]">
                  {t("login")}
                </button>
                <OAuth />
              </div>
              <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300 mt-2">
                {t("unregistered")}&nbsp;
                <span
                  className="text-cyan-700 hover:underline dark:text-cyan-500"
                  onClick={openSignupModal}
                >
                  {t("createAccount")}
                </span>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
