import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HOME_EN from "../locales/en/Home.json";
import MOVIEDETAIL_EN from "../locales/en/MovieDetail.json";
import MOVIECATEGORY_EN from "../locales/en/MovieCategory.json";
import HEADER_EN from "../locales/en/Header.json";
import SEARCH_EN from "../locales/en/Search.json";
import AUTH_EN from "../locales/en/Auth.json";
import FAVORITE_EN from "../locales/en/Favorite.json";

import HOME_VI from "../locales/vi/Home.json";
import MOVIEDETAIL_VI from "../locales/vi/MovieDetail.json";
import MOVIECATEGORY_VI from "../locales/vi/MovieCategory.json";
import HEADER_VI from "../locales/vi/Header.json";
import SEARCH_VI from "../locales/vi/Search.json";
import AUTH_VI from "../locales/vi/Auth.json";
import FAVORITE_VI from "../locales/vi/Favorite.json";

const resources = {
  en: {
    home: HOME_EN,
    movieDetail: MOVIEDETAIL_EN,
    movieCategory: MOVIECATEGORY_EN,
    header: HEADER_EN,
    search: SEARCH_EN,
    auth: AUTH_EN,
    favorite: FAVORITE_EN,
  },
  vi: {
    home: HOME_VI,
    movieDetail: MOVIEDETAIL_VI,
    movieCategory: MOVIECATEGORY_VI,
    header: HEADER_VI,
    search: SEARCH_VI,
    auth: AUTH_VI,
    favorite: FAVORITE_VI,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  ns: [
    "home",
    "movieDetail",
    "movieCategory",
    "header",
    "search",
    "auth",
    "favorite",
  ],
  fallbackLng: "en",
  defaultNS: "home",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
  debug: true, // Bật debug để kiểm tra log chi tiết
});

export default i18n;
