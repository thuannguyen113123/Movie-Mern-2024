import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { NEWS_API_URL } from "../../api/apiCall";

const NewsMovie = () => {
  gsap.registerPlugin(ScrollTrigger);
  const [listNewsMovie, setListNewsMovie] = useState([]);

  const { t } = useTranslation("home");

  const fetchNews = async () => {
    try {
      const res = await axios.get(NEWS_API_URL(3));
      const data = res.data;
      if (data && data.articles) setListNewsMovie(data.articles);
    } catch (error) {
      console.error("Lỗi lấy tin tức:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      "#title-news",
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
          trigger: "#title-news",
          toggleActions: "restart none none none",
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      "#news-new",
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
          trigger: "#news-new",
          toggleActions: "restart none none none",
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <div className="screen-max-width mb-12">
      <div className="inline-flex flex-col" id="title-news">
        <h3 className="font-semibold text-3xl max-md:mb-2 mx-4 md:mx-0">
          {t("news")}
        </h3>
        <hr className="h-[3px] bg-gradient-to-l from-transparent via-black to-transparent mb-8 w-full" />
      </div>
      <div id="news-new">
        {listNewsMovie.length > 0 && (
          <div className="flex flex-row gap-4">
            {/* Phần tử đầu tiên */}
            <div className="w-full md:w-8/12 relative">
              <Link
                to={listNewsMovie[0].url}
                target="_blank"
                rel="noopeper noreferrer"
              >
                <img
                  alt=""
                  src={
                    listNewsMovie[0].urlToImage ||
                    `https://caodem.com/wp-content/uploads/2019/12/phong-nen-tin-tuc-thoi-su-caodem.com_.jpg`
                  }
                  className="nav-height w-full relative"
                />
                <div
                  className="absolute w-full h-[97%] top-0 left-0"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2))",
                  }}
                />
                <div className="absolute bottom-6 left-0 w-full sm:px-[10px] md:px-[2rem] lg:px-[4rem]">
                  <div className="h-full flex items-center px-8 text-primary sm:w-auto ">
                    <div className="flex flex-col space-y-4">
                      {/* Title */}

                      <h4 className="text-2xl md:text-2xl lg:text-4xl font-bold line-clamp-2 text-left text-white ">
                        {listNewsMovie[0].title}
                      </h4>

                      <div className="flex items-center gap-4 text-white">
                        <h3>{listNewsMovie[0].author}</h3>
                        <h3>{listNewsMovie[0].publishedAt}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Các phần tử còn lại */}
            <div className="w-full md:w-4/12 flex flex-col justify-between space-y-4">
              {listNewsMovie.slice(1).map((item, index) => (
                <Link
                  key={index}
                  to={item.url}
                  target="_blank"
                  rel="noopeper noreferrer"
                >
                  <div className="flex flex-col space-y-4">
                    <img
                      alt=""
                      src={
                        item.urlToImage ||
                        `https://caodem.com/wp-content/uploads/2019/12/phong-nen-tin-tuc-thoi-su-caodem.com_.jpg`
                      }
                      className="w-full relative"
                    />
                    <div className="relative">
                      <h4 className="text-xl md:text-2xl lg:text-2xl font-bold line-clamp-2 text-left">
                        {item.title}
                      </h4>
                      <div className="flex  flex-col gap-2">
                        <h3>{item.author}</h3>
                        <h3>{item.publishedAt}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsMovie;
