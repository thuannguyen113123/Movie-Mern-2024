import { Modal } from "flowbite-react";
import { Alert, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import axios from "axios";

import OAuth from "../OAuth.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoginModalOpen,
  setSignupModalOpen,
} from "../../redux/modal/authModalSlice.js";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const SignUp = ({ onCloseModalSignUp }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation("auth");

  //Modal login
  const dispatch = useDispatch();
  const showModalSignUp = useSelector(
    (state) => state.authModal.signupModalOpen
  );

  // hàm xử lý khi nhấn đăng ký
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      return setErrorMessage("Vui lòng nhập tất cả các trường");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await axios.post(`/auth/register`, {
        name,
        email,
        password,
      });

      const data = res.data;
      if (!data.success) {
        return setErrorMessage(data.message);
      }
      openLoginModal();
      setLoading(false);
      toast.success("Đăng ký thành công");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      setLoading(false);
      toast.error("Đăng ký thất bại");
    }
  };

  // Hàm mở modal đăng nhập
  const openLoginModal = () => {
    dispatch(setLoginModalOpen(true));
    dispatch(setSignupModalOpen(false));
  };

  return (
    <>
      <Modal
        show={showModalSignUp}
        onClose={onCloseModalSignUp}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {t("register")}
            </h3>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <div>
                <Label value={t("username")} />
                <TextInput
                  type="text"
                  placeholder={t("username")}
                  id="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label value="Email" />
                <TextInput
                  type="email"
                  placeholder="Email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label value={t("password")} />
                <TextInput
                  type="password"
                  placeholder="••••••••••"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="bg-black w-full p-2 rounded-full hover:bg-[#1d1d1d]"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" /> <span>{t("Loading")} </span>
                  </>
                ) : (
                  t("register")
                )}
              </button>
              <OAuth />
              <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300 mt-2">
                {t("alreadyHaveAnAccount")} &nbsp;
                <span
                  className="text-cyan-700 hover:underline dark:text-cyan-500"
                  onClick={openLoginModal}
                >
                  {t("login")}
                </span>
              </div>
            </form>
            {errorMessage && (
              <Alert className="mt-5 text-[#ff0000]">{errorMessage}</Alert>
            )}{" "}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignUp;
