import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { posterPath } from "../../api/apiCall";

const CastItem = ({ casts }) => {
  return (
    <div style={{ width: "100%", height: "max-content" }}>
      <Swiper
        spaceBetween={10}
        slidesPerView={"auto"}
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
      >
        {casts.map((cast, index) => (
          <SwiperSlide
            key={index}
            style={{ width: "50%", md: "25%", lg: "20.5%" }}
          >
            <Link>
              <div
                className="relative"
                style={{
                  paddingTop: "80%",
                  position: "relative",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "darkgrey",
                  backgroundImage: `url(${posterPath(cast.profile_path)})`,
                }}
              >
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2">
                  <p className="text-white truncate">{cast.name}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CastItem;
