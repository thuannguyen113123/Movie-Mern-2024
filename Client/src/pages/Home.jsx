import React from "react";
import { popularMedia, topRatedMedia } from "../api/apiCall";
import Hero from "../components/Hero";
import PopularMovie from "../components/Movie/PopularMovie";
import NewsMovie from "../components/News/NewsMovie";
import TVShowPopular from "../components/TVShow/TVShowPopular";
import TVShowTopRated from "../components/TVShow/TVShowTopRated";
import MovieTopRated from "./../components/Movie/MovieTopRated";

const Home = () => {
  return (
    <div className="screen-max-width">
      <Hero popularMovies={popularMedia("movie")} mediaType="movie" />
      <PopularMovie popularMovies={popularMedia("movie")} mediaType="movie" />
      <MovieTopRated
        topRatedMovies={topRatedMedia("movie")}
        mediaType="movie"
      />
      <TVShowPopular popularTVShow={popularMedia("tv")} mediaType="tv" />
      <TVShowTopRated topRatedTVShow={topRatedMedia("tv")} mediaType="tv" />
      <NewsMovie />
    </div>
  );
};

export default Home;
