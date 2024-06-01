import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";

import { Link, useLocation } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { FaRegUser } from "react-icons/fa6";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { BsChevronRight } from "react-icons/bs";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { toggleTheme } from "../../redux/theme/themeSlice.js";
import { signoutSuccess } from "../../redux/user/userSlice.js";
import {
  setLoginModalOpen,
  setSignupModalOpen,
  setUpdatePasswordModalOpen,
} from "../../redux/modal/authModalSlice";
import AuthModal from "../Modal/AuthModal";
import LanguageSwitcher from "../LanguageSwitcher";
import menuConfigs from "../../configs/menu.config.js";
import Logo from "../Logo.jsx";

function Header() {
  //Tạo này để nó acctive vào cái mình chọn trong toggle
  const path = useLocation().pathname;

  const { t } = useTranslation("header");

  //Lấy trạng thái theme
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  //Lấy người dùng hiện tại
  const { currentUser, loginMethod } = useSelector((state) => state.user);

  //Đăng xuất
  const handleSignOut = async () => {
    try {
      const res = await axios.post("/user/signout");
      const data = await res.data;
      if (!data.success) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const openLoginModal = () => {
    dispatch(setLoginModalOpen(true));
  };
  const openSignupModal = () => {
    dispatch(setSignupModalOpen(true));
  };

  // Hàm mở modal đăng nhập
  const openUpdatePasswordModal = () => {
    dispatch(setUpdatePasswordModalOpen(true));
  };

  return (
    <header className="w-full   bg-white dark:bg-black ">
      <Navbar className="w-full screen-max-width bg-white dark:bg-black border-b-2">
        <Logo />

        <div className="flex  gap-2 max-sm:justify-end max-sm:flex-1 md:order-2 items-center">
          <LanguageSwitcher />

          <Button
            pill
            className="w-12 h-10 hidden sm:inline"
            color="gray"
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </Button>

          {currentUser?.user ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="user"
                  img={currentUser.user?.profilePicture}
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  @{currentUser.user?.username}
                </span>
                <span className="block text-sm font-medium truncate">
                  {currentUser.user?.email}
                </span>
              </Dropdown.Header>
              <Link to={"/dashboard?tab=profile"}>
                <Dropdown.Item>{t("profile")}</Dropdown.Item>
              </Link>
              <Link to={"/dashboard?tab=favorite"}>
                <Dropdown.Item>{t("listFavorite")}</Dropdown.Item>
              </Link>

              {loginMethod === "google" ? (
                <Dropdown.Item>
                  <Link
                    to="https://myaccount.google.com/security"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" hover:underline"
                  >
                    {t("changePassword")} Google
                  </Link>
                </Dropdown.Item>
              ) : (
                <Dropdown.Item onClick={openUpdatePasswordModal}>
                  {t("changePassword")}
                </Dropdown.Item>
              )}
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>
                {t("logout")}
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <>
              <Button pill className="w-12 h-10  relative group" color="gray">
                <div className="hover:opacity-50 cursor-default">
                  <FaRegUser />
                </div>
                <div className="lg:block sm:hidden bg-white dark:bg-black absolute top-6 -left-[5rem] transition transform translate-y-0 opacity-0 invisible group-hover:translate-y-5 group-hover:opacity-100 group-hover:visible duration-500 ease-in-out z-50 min-w-[200px]">
                  <div className="relative py-6 bg-inherit rounded-xl shadow-xl w-full iner ">
                    <div className="absolute top-[-10px] left-[calc(50%)] translate-x-[-50%] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white dark:border-b-[#181818]" />
                    <button
                      onClick={openSignupModal}
                      className="px-2 flex justify-between items-center w-full text-center py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-white mb-2"
                    >
                      <div className="flex justify-center items-center gap-2">
                        <FaSignInAlt />
                        <span>{t("register")}</span>
                      </div>
                      <BsChevronRight />
                    </button>
                    <button
                      onClick={openLoginModal}
                      className="px-2 flex justify-between items-center w-full text-center py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-white"
                    >
                      <div className="flex justify-center items-center gap-2">
                        <FaUserPlus />
                        <span>{t("login")}</span>
                      </div>
                      <BsChevronRight />
                    </button>
                  </div>
                </div>
              </Button>
            </>
          )}
          <Navbar.Toggle />
        </div>

        <Navbar.Collapse>
          {menuConfigs.main.map((nav, index) => (
            <Navbar.Link
              active={path === nav.path}
              as={"div"}
              key={index}
              className={`block py-2 pl-3 pr-4 md:p-0 ${
                path === nav.path
                  ? "bg-[#ff0000] text-white dark:text-white md:bg-transparent md:text-cyan-700"
                  : "border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
              }`}
            >
              <div className="md:block hidden uppercase">
                <Link
                  key={index}
                  to={nav.path}
                  className="px-5 lg:px-5 md:px-2 text-sm cursor-pointer text-gray dark:hover:text-white transitions-all"
                >
                  {nav.display}
                </Link>
              </div>
              <div className="sm:block md:hidden uppercase">
                <Link
                  key={index}
                  to={nav.path}
                  className="inline-block w-[100%] text-center text-[14px] py-2"
                >
                  <span>{nav.icon}</span>
                  <span>{nav.display}</span>
                </Link>
              </div>
            </Navbar.Link>
          ))}
        </Navbar.Collapse>
      </Navbar>
      <AuthModal />
    </header>
  );
}

export default Header;
