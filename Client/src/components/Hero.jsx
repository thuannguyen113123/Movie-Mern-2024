import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaPlay } from "react-icons/fa";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { backdropPath, posterPath, fetchGenres } from "../api/apiCall";
import { Dropdown } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../redux/globalLoading/globalLoadingSlice";

const Hero = ({ popularMovies, mediaType }) => {
  const [listMoviesPopular, setListMoviesPopular] = useState([]);
  const [genres, setGenres] = useState([]);
  const [visibleGenresCount, setVisibleGenresCount] = useState(10);
  const [showMore, setShowMore] = useState(true);

  const { t } = useTranslation("home");
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    dispatch(setGlobalLoading(true));
    try {
      const res = await axios.get(popularMovies);
      const data = res.data;

      if (data && data.results) setListMoviesPopular(data.results);
      dispatch(setGlobalLoading(false));
    } catch (error) {
      console.log(error.message);
      dispatch(setGlobalLoading(false));
    }
  };

  const getGenres = async () => {
    dispatch(setGlobalLoading(true));
    try {
      const res = await axios.get(fetchGenres("movie"));
      const data = res.data;
      if (data && data.genres) setGenres(data.genres);
      dispatch(setGlobalLoading(false));
    } catch (error) {
      console.log(error.message);
      dispatch(setGlobalLoading(false));
    }
  };

  useEffect(() => {
    getPopularMovies();
    getGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useGSAP(() => {
    gsap.to("#title", { opacity: 1, delay: 2 });
    gsap.to(".link", { opacity: 1, y: 0, duration: 1, stagger: 0.25 });
  }, []);

  const handleShowMoreGenres = () => {
    if (showMore) {
      setVisibleGenresCount(genres.length);
    } else {
      setVisibleGenresCount(10);
    }
    setShowMore(!showMore);
  };

  return (
    <section className="relative ">
      <Swiper
        className="relative group swiper-component rounded-3xl"
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        loop={listMoviesPopular.length > 1}
        navigation={{
          nextEl: ".button-next-slide",
          prevEl: ".button-prev-slide",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
      >
        {listMoviesPopular.map((movie, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative sm:pr-20 pr-10 bg-cover bg-center flex items-center justify-center rounded-3xl h-[50vh]"
              style={{
                backgroundImage: `url(${
                  movie.backdrop_path
                    ? backdropPath(movie.backdrop_path)
                    : posterPath(movie.poster_path)
                })`,
              }}
            >
              <div
                className="absolute w-full h-full top-0 left-0 rounded-3xl"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2))",
                }}
              >
                <div className="absolute bottom-4 left-0 w-full sm:px-[10px] md:px-[2rem] lg:px-[4rem]">
                  <div className="h-full flex items-center px-8 text-primary sm:w-auto md:w-1/3 lg:w-3/5">
                    <div className="flex flex-col space-y-4">
                      {/* Title */}
                      <h4
                        className="text-2xl md:text-2xl lg:text-4xl font-bold line-clamp-2 text-left text-white hover:overflow-visible"
                        title={movie.title || movie.name}
                      >
                        {movie.title || movie.name}
                      </h4>
                      {/* Rating and Genres */}
                      <div className="flex items-center gap-4">
                        <span className="text-white">
                          {movie.vote_average.toFixed(1)}
                        </span>
                        <span className="text-white">
                          {formatDate(movie.release_date)}
                        </span>
                        <div>
                          {[...movie.genre_ids]
                            .splice(0, 2)
                            .map((genreId, index) => (
                              <span key={index} className=" text-white mr-2">
                                {genres.find((e) => e.id === genreId)?.name}
                              </span>
                            ))}{" "}
                        </div>
                      </div>

                      {/* Watch Now Button */}
                      <Link
                        to={`/${mediaType}/${movie.id}`}
                        className="bg-[#ff0000] text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 w-[150px]"
                      >
                        <FaPlay />
                        <span>Xem</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="absolute top-[50%] transform -translate-y-1/2 button-next-slide z-10 group-hover:left-0 -left-[23rem] duration-500 w-[40px] h-[40px] bg-black grid place-items-center text-white">
          <HiOutlineArrowNarrowLeft />
        </div>
        <div className="absolute top-[50%] transform -translate-y-1/2 button-prev-slide z-10 group-hover:right-0 -right-[23rem] duration-500 w-[40px] h-[40px] bg-black grid place-items-center text-white">
          <HiOutlineArrowNarrowRight />
        </div>
      </Swiper>
      {/* phần danh mục */}
      <div className="md:flex md:justify-between md:items-center hidden my-4">
        <h1 className="font-semibold text-3xl opacity-0 max-md:mb-2" id="title">
          {t("genres")}
        </h1>
        <button
          className="link hidden rounded-full "
          onClick={handleShowMoreGenres}
        >
          {showMore ? t("showMore") : t("showLess")}
        </button>
      </div>
      {/* Phần di động */}

      <div className="inline-block md:hidden w-full relative my-4 ">
        <Dropdown
          label={t("genres")}
          style={{ width: "100%", backgroundColor: "black" }}
          className="absolute bottom-0 left-0 w-full"
        >
          {genres &&
            genres.map((item) => (
              <Dropdown.Item key={item.id} className="bg-black text-2xl">
                <Link to={`/genre/${item.id}`}>
                  <span>{item.name}</span>
                </Link>
              </Dropdown.Item>
            ))}
        </Dropdown>
      </div>

      {/* Phần desktop */}
      <div className="hidden md:grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {genres &&
          genres.slice(0, visibleGenresCount).map((item) => (
            <div
              key={item.id}
              className="p-4 bg-white dark:bg-black rounded text-center shadow hover:scale-110"
            >
              <Link to={`/genre/${item.id}`}>
                <span>{item.name}</span>
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Hero;
