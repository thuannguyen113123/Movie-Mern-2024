import { Swiper, SwiperSlide } from "swiper/react";
import MediaItem from "./MediaItem";

function RecommendSlide({ medias, mediaType }) {
  return (
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
    >
      {medias.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default RecommendSlide;
