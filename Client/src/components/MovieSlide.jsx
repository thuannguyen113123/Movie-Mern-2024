import React, { useEffect, useState } from "react";
import { backdropPath, posterPath } from "../api/apiCall";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
// import CircularRate from "./CircularRate";

const MovieSlide = ({ movie, mediaType }) => {
  const [releaseDate, setReleaseDate] = useState(null);

  useEffect(() => {
    if (movie.release_date) {
      setReleaseDate(movie.release_date.split("-")[0]);
    } else if (movie.first_air_date) {
      setReleaseDate(movie.first_air_date.split("-")[0]);
    }
  }, [movie.release_date, movie.first_air_date]);
  return (
    <div>
      <div
        className="sm:pr-20 pr-10 h-[50vh] bg-center bg-cover relative group"
        style={{
          backgroundImage: `url(${
            movie.backdrop_path
              ? backdropPath(movie.backdrop_path)
              : posterPath(movie.poster_path)
          })`,
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100" />

        <Link
          to={`/${mediaType}/${movie.id}`}
          className="bg-[#ff0000] text-white px-6 py-2 rounded-lg flex items-center justify-center space-x-2  opacity-0 group-hover:opacity-100  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <FaPlay />
        </Link>

        <div className="transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 absolute bottom-0 md:bottom-[-10px] w-full max-h-max box-border px-2 py-2 md:px-4 md:py-4">
          <div className="space-y-2 md:space-y-4">
            <p className="text-white">{releaseDate}</p>
            <p className="text-lg font-bold text-white w-[240px] ">
              {movie.title || movie.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSlide;
