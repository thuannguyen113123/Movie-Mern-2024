import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

import {
  backdropPath,
  posterPath,
  mediaDetails,
  mediaByCast,
  backdropMedia,
  mediaRecommend,
  popularMedia,
} from "../api/apiCall";
import { FaPlay } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import CastItem from "../components/Cast/CastItem";
import BackdropSlide from "../components/BackdropSlide";
import ReviewSection from "../components/ReviewSection";
import RecommendSlide from "../components/RecommendSlide";
import PopularMovie from "../components/Movie/PopularMovie";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setLoginModalOpen } from "../redux/modal/authModalSlice";
import { addFavorite, removeFavorite } from "../redux/user/userSlice";
import { toast } from "react-toastify";

const MediaDetail = () => {
  const { id, mediaType } = useParams();
  const [movieDetail, setMovieDetail] = useState({});

  const [casts, setCasts] = useState([]);
  const [recommends, setRecommends] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);

  const { t } = useTranslation("movieDetail");

  const [backdrops, setBackdrops] = useState([]);

  //Lấy người dùng hiện tại
  const { currentUser, listFavorites } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const getMovieDetails = async () => {
    try {
      const res = await axios.get(mediaDetails(mediaType, id));
      const data = res.data;
      if (data) setMovieDetail(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCastByMovie = async () => {
    try {
      const res = await axios.get(mediaByCast(mediaType, id));
      const data = res.data;
      if (data && data.cast) setCasts(data.cast.slice(0, 20));
    } catch (error) {
      console.log(error.message);
    }
  };

  const getBackdrop = async () => {
    try {
      const res = await axios.get(backdropMedia(mediaType, id));
      if (res.data && res.data.backdrops)
        setBackdrops(res.data.backdrops.slice(0, 5));
    } catch (error) {
      console.log(error.message);
    }
  };

  const getRecommend = async () => {
    try {
      const res = await axios.get(mediaRecommend(mediaType, id));
      if (res.data && res.data.results)
        setRecommends(res.data.results.slice(0, 10));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getMovieDetails();
    getCastByMovie();
    getBackdrop();
    getRecommend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (currentUser?.user) {
      const fetchFavorites = async () => {
        try {
          const res = await axios.get("/user/favorites/getFavorite");
          const data = res.data;
          if (data.success) {
            const isFavorite = data.favorite.some(
              (fav) => fav.mediaId.toString() === id
            );
            setIsFavorite(isFavorite);
          }
        } catch (error) {
          toast.error("Lỗi lấy danh sách yêu thích");
        }
      };

      fetchFavorites();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  const onFavoriteClick = async () => {
    if (!currentUser?.user) return dispatch(setLoginModalOpen(true));

    if (onRequest) return;

    if (isFavorite) {
      onRemoveFavorite();
      return;
    }

    setOnRequest(true);

    const res = await axios.post("/user/favorite/addFavorite", {
      mediaId: movieDetail.id,
      mediaTitle: movieDetail.title || movieDetail.name,
      mediaType: mediaType,
      mediaPoster: movieDetail.poster_path,
      mediaRate: movieDetail.vote_average,
    });

    const data = await res.data;

    setOnRequest(false);

    if (data.success) {
      dispatch(addFavorite(data.favorite));
      setIsFavorite(true);
      toast.success("Thêm vào danh sách yêu thích thành công");
    } else {
      toast.error("Lỗi thêm vào danh sách yêu thích");
    }
  };

  const onRemoveFavorite = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const favorite = listFavorites.find(
      (favorite) => favorite.mediaId.toString() === movieDetail.id.toString()
    );

    const res = await axios.delete(
      `/user/favorite/removeFavorite/${favorite._id}`
    );

    const data = await res.data;

    setOnRequest(false);

    if (data.success) {
      dispatch(removeFavorite(favorite));
      setIsFavorite(false);
      toast.success("Xóa khỏi danh sách yêu thích thành công");
    }
  };

  return (
    <div className="">
      <div
        className="bg-cover bg-top h-[150vh] sm:h-[100vh] relative"
        style={{
          backgroundImage: `url(${
            movieDetail.backdrop_path
              ? backdropPath(movieDetail.backdrop_path)
              : posterPath(movieDetail.poster_path)
          })`,
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="absolute w-full h-full top-0 left-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2))",
          }}
        >
          <div className="text-white screen-max-width mx-auto p-[2px]">
            {/* media content */}
            <div className="mt-[5rem] md:mt-[10rem] lg:mt-[5rem]">
              <div className="flex flex-col md:flex-row">
                {/* poster */}
                <div className="w-[70%] sm:w-[50%] md:w-[40%] mx-auto md:mx-0 md:mr-2 mb-2 md:mb-0">
                  <div
                    className="pt-[140%] bg-cover bg-no-repeat"
                    style={{
                      backgroundImage: `url(${posterPath(
                        movieDetail.poster_path || movieDetail.backdrop_path
                      )})`,
                    }}
                  ></div>
                </div>
                {/* poster */}

                {/* Thông tin */}
                <div className="w-full md:w-[60%]  flex">
                  <div className="space-y-2 flex flex-col justify-between">
                    {/* tiêu đề */}
                    <h4 className="text-2xl md:text-2xl lg:text-4xl font-bold line-clamp-2 text-left">
                      {`${movieDetail.title || movieDetail.name} ${
                        mediaType === "movie"
                          ? movieDetail.release_date &&
                            movieDetail.release_date.split("-")[0]
                          : movieDetail.first_air_date &&
                            movieDetail.first_air_date.split("-")[0]
                      }`}
                    </h4>
                    {/* tiêu đề */}

                    {/* Đánh giá và thể loại */}
                    <div className="flex items-center space-x-1">
                      {/* Đánh giá */}

                      {/* Đánh giá */}
                      <div className="border-l-2 border-gray-300 h-6 mx-2" />
                      {/* Danh mục */}
                      {movieDetail.genres &&
                        movieDetail.genres.map((genre, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#ff0000] text-white mr-2"
                          >
                            {genre.name}
                          </span>
                        ))}
                    </div>
                    {/* Đánh giá và danh mục*/}

                    {/* overview */}
                    <p className="line-clamp-5">{movieDetail.overview}</p>
                    {/* overview */}
                    {/* button */}
                    <div className="flex space-x-1">
                      <button
                        className={`flex items-center max-w-max py-2 px-4 text-lg ${
                          onRequest ? "cursor-not-allowed opacity-50" : ""
                        }`}
                        onClick={onFavoriteClick}
                        disabled={onRequest}
                      >
                        {onRequest ? (
                          <svg
                            className="animate-spin h-5 w-5 mr-3 text-gray-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            ></path>
                          </svg>
                        ) : isFavorite ? (
                          <AiFillHeart className="mr-3 text-red-500" />
                        ) : (
                          <AiOutlineHeart className="mr-3 text-red-500" />
                        )}
                        {onRequest ? "Loading..." : "Favorite"}
                      </button>
                      <button className="bg-[#ff0000] text-white px-4 py-2  flex items-center justify-center space-x-2 w-[150px]">
                        <FaPlay />
                        <span>Xem</span>
                      </button>
                    </div>
                    {/* button */}

                    {/* Diễn viên */}
                    <div>
                      <h2 className="text-3xl font-bold">{t("Cast")}</h2>
                      <CastItem casts={casts} />
                    </div>

                    {/* Diễn viên */}
                  </div>
                </div>
                {/* Thông tin */}
              </div>
            </div>
            {/* media content */}
          </div>
        </div>
      </div>
      {/* media backdrop */}
      <div className="screen-max-width">
        {backdrops.length > 0 && (
          <div className="pt-8">
            <h2 className="text-3xl font-bold py-8">{t("Backdrop")}</h2>
            <BackdropSlide backdrops={backdrops} />
          </div>
        )}

        {/* Bình luận*/}
        <ReviewSection media={movieDetail} mediaType={mediaType} />

        {/* Bình luận*/}

        {/* Media bạn có thể thích */}
        <div className="my-4">
          <h2 className="text-3xl font-bold py-8">{t("Suggestions")}</h2>
          {recommends.length > 0 && (
            <RecommendSlide medias={recommends} mediaType={mediaType} />
          )}
          {recommends.length === 0 && (
            <PopularMovie popularMovies={popularMedia(mediaType)} />
          )}
        </div>
        {/* Media bạn có thể thích */}
      </div>
    </div>
  );
};

export default MediaDetail;
