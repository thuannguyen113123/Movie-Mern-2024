import React from "react";
import { FaFacebook, FaGithub, FaRegUser } from "react-icons/fa";
import { setLoginModalOpen } from "../../redux/modal/authModalSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Logo from "../Logo";

const FooterCom = () => {
  const dispatch = useDispatch();
  const openLoginModal = () => {
    dispatch(setLoginModalOpen(true));
  };
  return (
    <footer className="py-5 sm:px-10 px-5 bg-white dark:bg-black ">
      <div className="screen-max-width">
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <Link to="#" target="_blank" rel="noopeper noreferrer">
            <FaFacebook className="text-[32px]" />
          </Link>
          <Link
            to="https://github.com/thuannguyen113123"
            target="_blank"
            rel="noopeper noreferrer"
          >
            <FaGithub className="text-[32px]" />
          </Link>

          <FaRegUser onClick={openLoginModal} className="text-[32px]" />
        </div>

        <div className="bg-neutral-700 my-5 h-[1px] w-full" />

        <div className="flex md:flex-row flex-col md:items-center justify-between">
          <p className="font-semibold text-gray text-xs">
            Copright @ 2024 ThuậnMovie Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterCom;
