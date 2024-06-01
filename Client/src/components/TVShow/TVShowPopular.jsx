import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import MediaItem from "../MediaItem";

const TVShowPopular = ({ popularTVShow, mediaType }) => {
  gsap.registerPlugin(ScrollTrigger);
  const [listSeriesPopular, setListSeriesPopular] = useState([]);

  const { t } = useTranslation("home");

  const getListSeriesPopular = async () => {
    try {
      const res = await axios.get(popularTVShow);
      const data = res.data;
      if (data && data.results) setListSeriesPopular(data.results);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(listSeriesPopular);
  useEffect(() => {
    getListSeriesPopular();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      ".titletv",
      {
        xPercent: -100,
        opacity: 0,
      },
      {
        xPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".titletv",
          toggleActions: "restart none none none",
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      "#tvshow",
      {
        opacity: 0,
        xPercent: 100,
      },
      {
        xPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: "#tvshow",
          toggleActions: "restart none none none",
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <div className="mx-auto py-4 xl:py-16">
      <div className="titletv inline-flex flex-col">
        <h3 className="font-semibold text-3xl max-md:mb-2 mx-4 md:mx-0">
          {t("tvShowPopular")}
        </h3>
        <hr className="h-[3px] bg-gradient-to-l from-transparent via-black to-transparent mb-8 w-full" />
      </div>
      <Swiper
        grabCursor={true}
        loop={true}
        style={{ width: "100%", height: "max-content" }}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 40 },
        }}
        id="tvshow"
      >
        {listSeriesPopular &&
          listSeriesPopular.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MediaItem media={movie} mediaType={mediaType} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default TVShowPopular;
