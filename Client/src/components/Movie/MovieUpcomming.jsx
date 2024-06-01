import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  airingTodayMedia,
  backdropPath,
  fetchGenres,
  posterPath,
  upcomingMedia,
} from "../../api/apiCall";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

const MediaUpcomming = ({ mediaType }) => {
  const [listMediaUpcomming, setListMediaUpcomming] = useState([]);
  const [genres, setGenres] = useState([]);

  const getListMediaUpcomming = async () => {
    try {
      let res;
      if (mediaType === "movie") {
        res = await axios.get(upcomingMedia(mediaType));
      } else if (mediaType === "tv") {
        res = await axios.get(airingTodayMedia(mediaType));
      }
      const data = res.data;
      if (data && data.results) setListMediaUpcomming(data.results);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getGenres = async () => {
    try {
      const res = await axios.get(fetchGenres(mediaType));
      const data = res.data;
      if (data && data.genres) setGenres(data.genres);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getListMediaUpcomming();
    getGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaType]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="w-full">
      <Swiper
        className="relative group swiper-component"
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        loop={listMediaUpcomming.length > 1}
        navigation={{
          nextEl: ".button-next-slide",
          prevEl: ".button-prev-slide",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
      >
        {listMediaUpcomming.map((movie, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative sm:pr-20 pr-10 bg-cover bg-center flex items-center justify-center nav-height"
              style={{
                backgroundImage: `url(${
                  movie.backdrop_path
                    ? backdropPath(movie.backdrop_path)
                    : posterPath(movie.poster_path)
                })`,
              }}
            >
              <div
                className="absolute w-full h-full top-0 left-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2))",
                }}
              >
                <div className="absolute top-0 left-0 h-full w-full sm:px-[10px] md:px-[2rem] lg:px-[4rem]">
                  <div className="h-full  flex items-center px-8 text-primary sm:w-auto md:w-1/3 lg:w-3/5">
                    <div className="flex flex-col space-y-4">
                      <h4
                        className="text-2xl md:text-2xl lg:text-4xl font-bold line-clamp-2 text-left text-white hover:overflow-visible"
                        title={movie.title || movie.name}
                      >
                        {movie.title || movie.name}
                      </h4>
                      <div className="flex items-center gap-4">
                        <span className="text-white">
                          {movie.vote_average.toFixed(1)}
                        </span>
                        <span className="text-white">
                          {formatDate(
                            movie.release_date || movie.first_air_date
                          )}
                        </span>
                      </div>
                      <div>
                        {[...movie.genre_ids]
                          .splice(0, 2)
                          .map((genreId, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#ff0000] text-white mr-2"
                            >
                              {genres.find((e) => e.id === genreId)?.name}
                            </span>
                          ))}
                      </div>
                      <div className="line-clamp-3 text-white">
                        {movie.overview}
                      </div>
                      <Link
                        to={`/${mediaType}/${movie.id}`}
                        className="bg-[#ff0000] text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 w-[180px]"
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
    </div>
  );
};

export default MediaUpcomming;
