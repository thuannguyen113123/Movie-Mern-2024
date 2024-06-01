import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  backdropPath,
  fetchGenres,
  genreMediaAPI,
  posterPath,
  upcomingMedia,
} from "../api/apiCall";

import { IoFilter } from "react-icons/io5";
import MediaItem from "./MediaItem";
import { FaPlay } from "react-icons/fa";

const GenreMovie = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState("");
  const [ListGenres, setListGenres] = useState([]);
  const [listMediaUpcomming, setListMediaUpcomming] = useState([]);
  //Lọc phim
  const [filterType, setFilterType] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const getMoviesByGenre = async (page = 1) => {
    try {
      const res = await axios.get(genreMediaAPI("movie", id, page));
      setMovies((prevMovies) => [...prevMovies, ...res.data.results]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getGenreName = async () => {
      try {
        const res = await axios.get(fetchGenres("movie"));
        const genre = res.data.genres.find(
          (genre) => genre.id === parseInt(id)
        );
        setListGenres(res.data.genres);
        setGenreName(genre ? genre.name : "Thể loại");
      } catch (error) {
        console.log(error.message);
      }
    };

    const getListMediaUpcomming = async () => {
      try {
        const res = await axios.get(upcomingMedia("movie"));
        const data = res.data;
        if (data && data.results) setListMediaUpcomming(data.results);
      } catch (error) {
        console.log(error.message);
      }
    };

    setMovies([]);
    setCurrentPage(1);
    getMoviesByGenre();
    getGenreName();
    getListMediaUpcomming();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  const loadMoreMovies = async () => {
    setIsLoadingMore(true);
    await getMoviesByGenre(currentPage + 1);
    setCurrentPage(currentPage + 1);
    setIsLoadingMore(false);
  };

  const filteredMovies = movies.filter((movie) => {
    if (filterType === "topRated") {
      return movie.vote_average >= 8;
    } else if (filterType === "nowPlaying") {
      // Lọc phim theo thời gian ra mắt (ví dụ: lấy các phim ra mắt trong 6 tháng gần nhất)
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      const releaseDate = new Date(movie.release_date);
      return releaseDate >= sixMonthsAgo;
    } else {
      return true; // Mặc định không lọc
    }
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="screen-max-width my-4">
      {/* <MovieUpcomming /> */}
      <div className="w-full flex gap-2">
        <div
          className="w-full sm:w-4/12 overflow-y-auto"
          style={{ maxHeight: "50vh" }}
        >
          {ListGenres &&
            ListGenres.map((genre) => (
              <div
                key={genre.id}
                className={`p-4 rounded text-center shadow hover:bg-gray-400  ${
                  parseInt(id) === genre.id
                    ? "bg-blue-500 text-white"
                    : "bg-white dark:bg-black text-black dark:text-white"
                }`}
              >
                <Link to={`/genre/${genre.id}`}>
                  <span>{genre.name}</span>
                </Link>
              </div>
            ))}
        </div>

        <div className="md:w-8/12 w-full">
          <Swiper
            grabCursor={true}
            loop={true}
            style={{ width: "100%", height: "max-content" }}
            spaceBetween={30}
            slidesPerView={1}
            // breakpoints={{
            //   640: { slidesPerView: 3, spaceBetween: 20 },
            //   768: { slidesPerView: 4, spaceBetween: 30 },
            //   1024: { slidesPerView: 6, spaceBetween: 40 },
            // }}
          >
            {listMediaUpcomming &&
              listMediaUpcomming.map((movie, index) => (
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
                                    <span
                                      key={index}
                                      className=" text-white mr-2"
                                    >
                                      {
                                        ListGenres.find((e) => e.id === genreId)
                                          ?.name
                                      }
                                    </span>
                                  ))}{" "}
                              </div>
                            </div>

                            {/* Watch Now Button */}
                            <Link
                              to={`/movie/${movie.id}`}
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
          </Swiper>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold my-4">{genreName}</h1>
        <div className="border-[1px] rounded-lg relative ">
          <select
            className="border-none outline-none pl-8 pr-4 py-2 appearance-none bg-transparent dark:bg-black"
            onChange={(e) => handleFilterChange(e.target.value)}
            value={filterType}
          >
            <option value="default">Mặc định</option>
            <option value="topRated">Đánh giá cao</option>
            <option value="nowPlaying">Mới nhất</option>
          </select>
          <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none">
            <IoFilter className="text-lg  " />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {filteredMovies.map((movie) => (
          <MediaItem key={movie.id} media={movie} />
        ))}
      </div>
      <div className="flex justify-center my-8">
        <button
          className="mt-8  bg-[#ff0000] text-white py-2 px-4 rounded disabled:opacity-50"
          onClick={loadMoreMovies}
          disabled={isLoadingMore}
        >
          {isLoadingMore ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default GenreMovie;
