import axios from "axios";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import MovieSlide from "../MovieSlide";
import { useTranslation } from "react-i18next";

const MovieTopRated = ({ topRatedMovies, mediaType }) => {
  const [movieTopRated, setMovieTopRated] = useState([]);

  const { t } = useTranslation("home");

  const getListMovieTopRated = async () => {
    try {
      const res = await axios.get(topRatedMovies);
      const data = res.data;
      if (data && data.results) setMovieTopRated(data.results);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getListMovieTopRated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto py-4 xl:py-16">
      <div className="inline-flex flex-col">
        <h3 className="font-semibold text-3xl max-md:mb-2 mx-4 md:mx-0">
          {t("movieTopRated")}
        </h3>
        <hr className="h-[3px] bg-gradient-to-l from-transparent via-black to-transparent mb-8 w-full" />
      </div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        // slidesPerView={"auto"}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {movieTopRated &&
          movieTopRated.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className="relative">
                <MovieSlide movie={movie} mediaType={mediaType} />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieTopRated;
