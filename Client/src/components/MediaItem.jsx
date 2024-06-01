import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { posterPath } from "../api/apiCall";
import { FaPlay } from "react-icons/fa";

const MediaItem = ({ mediaType, media }) => {
  const [title, setTitle] = useState("");
  const [posterpath, setPosterpath] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  // const [rate, setRate] = useState(null);

  useEffect(() => {
    setTitle(media.title || media.name || media.mediaTitle);

    setPosterpath(
      posterPath(
        media.poster_path ||
          media.backdrop_path ||
          media.mediaPoster ||
          media.profile_path
      )
    );

    if (mediaType === "movie") {
      setReleaseDate(media.release_date && media.release_date.split("-")[0]);
    } else {
      setReleaseDate(
        media.first_air_date && media.first_air_date.split("-")[0]
      );
    }

    // setRate(media.vote_average || media.mediaRate);
  }, [media, mediaType]);

  return (
    <>
      <Link
        to={
          mediaType !== "people"
            ? `/${mediaType}/${media.id}`
            : `/person/${media.id}`
        }
      >
        <div
          className="sm:pr-20 pr-10 h-[50vh] bg-center bg-cover relative group"
          style={{
            backgroundImage: `url(${posterpath})`,
          }}
        >
          {mediaType !== "people" && (
            <>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
              <Link
                to={`/${mediaType}/${media.id}`}
                className="bg-[#ff0000] text-white px-6 py-2 rounded-lg flex items-center justify-center space-x-2  opacity-0 group-hover:opacity-100  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <FaPlay />
              </Link>
              <div className="transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 absolute bottom-0 md:bottom-[-10px] w-full max-h-max box-border px-2 py-2 md:px-4 md:py-4">
                <div className="space-y-2 md:space-y-4">
                  {/* {rate && <CircularRate value={rate} />} */}
                  <p className="text-white">{releaseDate}</p>
                  <p className="font-bold text-1rem truncate text-white">
                    {title}
                  </p>
                </div>
              </div>
            </>
          )}
          {mediaType === "people" && (
            <div className="absolute bottom-0 w-full pb-[4px] px-10 bg-opacity-60 bg-black">
              <p className="text-white">{media.name}</p>
            </div>
          )}
        </div>
      </Link>
    </>
  );
};

export default MediaItem;
