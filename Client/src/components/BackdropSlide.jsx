import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

import { backdropPath } from "../api/apiCall";

const BackdropSlide = ({ backdrops }) => {
  return (
    <div className="">
      <Swiper
        freeMode={true}
        spaceBetween={10}
        grabCursor={true}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        style={{ width: "100%", height: "max-content" }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
      >
        {backdrops.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="bg-cover bg-center pt-[60%]"
              style={{
                backgroundImage: `url(${backdropPath(item.file_path)})`,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BackdropSlide;
