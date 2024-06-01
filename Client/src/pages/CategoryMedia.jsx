import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import MediaUpcomming from "../components/Movie/MovieUpcomming";
import { useDispatch } from "react-redux";
import { setAppState } from "../redux/app/appStateSlice";
import { popularMedia, topRatedMedia } from "../api/apiCall";
import { toast } from "react-toastify";
import { setGlobalLoading } from "../redux/globalLoading/globalLoadingSlice";
import axios from "axios";

import ToggleButton from "../components/ToggleButton";
import MediaItem from "../components/MediaItem";
import { useTranslation } from "react-i18next";

const CategoryMedia = () => {
  const { mediaType } = useParams();

  const [medias, setMedias] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [currCategory, setCurrCategory] = useState(0);
  const [currPage, setCurrPage] = useState(1);

  const dispatch = useDispatch();

  const mediaCategories = useMemo(() => [popularMedia, topRatedMedia], []);

  const { t } = useTranslation("movieCategory");

  const category = [t("popular"), t("topRated")];

  useEffect(() => {
    dispatch(setAppState(mediaType));
    window.scrollTo(0, 0);
  }, [mediaType, dispatch]);

  useEffect(() => {
    const getMedias = async () => {
      if (currPage === 1) dispatch(setGlobalLoading(true));
      setMediaLoading(true);

      let url;
      if (mediaCategories[currCategory]) {
        url = mediaCategories[currCategory](mediaType);
      } else {
        console.error("Danh mục không hợp lệ");
        return;
      }

      try {
        const res = await axios.get(`${url}&page=${currPage}`);
        const data = res.data;

        setMediaLoading(false);
        dispatch(setGlobalLoading(false));

        if (data && data.results) {
          if (currPage !== 1) setMedias((m) => [...m, ...data.results]);
          else setMedias([...data.results]);
        } else {
          toast.error("No results found");
        }
      } catch (error) {
        setMediaLoading(false);
        dispatch(setGlobalLoading(false));
        toast.error(error.message);
      }
    };

    getMedias();
  }, [mediaType, currCategory, currPage, mediaCategories, dispatch]);

  const onCategoryChange = (categoryIndex) => {
    if (currCategory === categoryIndex) return;
    setMedias([]);
    setCurrPage(1);
    setCurrCategory(categoryIndex);
  };

  const onLoadMore = () => setCurrPage(currPage + 1);

  return (
    <div>
      <MediaUpcomming mediaType={mediaType} />
      <div className="screen-max-width mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-16">
          <h2 className="font-bold text-xl">
            {mediaType === "movie" ? t("movies") : t("tv")}
          </h2>
          <div className="flex space-x-4">
            <ToggleButton
              selected={currCategory}
              onCategoryChange={onCategoryChange}
              categories={category}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {medias.map((movie) => (
            <MediaItem key={movie.id} media={movie} mediaType={mediaType} />
          ))}
        </div>

        <div className="w-full flex justify-center items-center">
          <button
            className="mt-8  bg-[#ff0000] text-white py-2 px-4 rounded disabled:opacity-50"
            onClick={onLoadMore}
            disabled={mediaLoading}
          >
            {mediaLoading ? t("Loading") : t("loadMore")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryMedia;
