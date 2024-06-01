import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle, AiOutlineLoading } from "react-icons/ai";

import { searchMedia, fetchGenres } from "./../api/apiCall";
import MediaItem from "../components/MediaItem";
import { useTranslation } from "react-i18next";

const mediaTypes = ["movie", "tv", "people"];
const sortOptions = ["desc", "asc"];
const years = Array.from(
  { length: 30 },
  (_, i) => new Date().getFullYear() - i
);

const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "",
    year: "",
  });
  const [mediaType, setMediaType] = useState(mediaTypes[0]);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const [page, setPage] = useState(1);

  const { t } = useTranslation("search");

  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const sortMedia = (mediaList, sortOrder) => {
    return mediaList.sort((a, b) => {
      const dateA = new Date(a.release_date || a.first_air_date);
      const dateB = new Date(b.release_date || b.first_air_date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  const search = useCallback(async () => {
    setLoading(true);

    const urlParams = new URLSearchParams(location.search);
    const mediaType = urlParams.get("mediaType") || "movie";
    const sort = urlParams.get("sort") || "desc";
    try {
      const res = await axios.get(
        searchMedia(
          mediaType,
          sidebarData.searchTerm,
          sidebarData.sort,
          sidebarData.category,
          sidebarData.year,
          page
        )
      );
      if (res.status === 200) {
        const sortedResults = sortMedia(res.data.results, sort);
        if (page > 1) setMedia((prev) => [...prev, ...sortedResults]);
        else setMedia(sortedResults);
        setShowMore(res.data.results.length === 20);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, page]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    const yearFromUrl = urlParams.get("year");

    setSidebarData({
      searchTerm: searchTermFromUrl || "",
      sort: sortFromUrl || "desc",
      category: categoryFromUrl || "",
      year: yearFromUrl || "",
    });

    if (urlParams.get("searchTerm")) {
      search();
    }
  }, [location.search, search]);

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const res = await axios.get(fetchGenres(mediaType));
        if (res.status === 200) {
          setListCategory(res.data.genres);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getAllCategory();
  }, [mediaType]);

  useEffect(() => {
    setMedia([]);
    setPage(1);
  }, [mediaType]);

  const handleShowMore = async () => {
    setPage((prevPage) => prevPage + 1);
  };

  const onCategoryChange = (selectedCategory) => setMediaType(selectedCategory);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSidebarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("mediaType", mediaType);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    urlParams.set("year", sidebarData.year);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSidebarData((prevData) => ({
        ...prevData,
        searchTerm: searchValue,
      }));
    }
  };

  const handleClear = () => {
    setSidebarData((prevData) => ({
      ...prevData,
      searchTerm: "",
    }));
    inputRef.current.focus();
  };

  const filteredMedia = sortMedia(
    media.filter((item) => {
      return (
        (!sidebarData.category ||
          item.genre_ids.includes(Number(sidebarData.category))) &&
        (!sidebarData.year ||
          new Date(item.release_date || item.first_air_date).getFullYear() ===
            Number(sidebarData.year))
      );
    }),
    sidebarData.sort
  );

  return (
    <div className="screen-max-width pb-[250px]">
      <h2 className="text-3xl lg:text-2xl font-bold my-6">{t("search")}</h2>
      <div className="flex mb-4 justify-center items-center">
        {mediaTypes.map((item, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-2 text-lg ${
              mediaType === item
                ? "bg-[#ff0000] text-white"
                : "bg-transparent dark:text-white text-black "
            } rounded-lg`}
            onClick={() => onCategoryChange(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="w-full mb-4">
        <form onSubmit={handleSubmit} className="mx-auto relative">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            tìm kiếm
          </label>
          <div className="relative mx-6 md:mx-0">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={t("EnterToSearch")}
              spellCheck="false"
              ref={inputRef}
              onChange={handleChange}
              value={sidebarData.searchTerm}
              onFocus={() => setShowMore(false)}
              required
            />

            <div className="text-black absolute end-0.5 bottom-[4px]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 right-[100px]">
              {!!sidebarData.searchTerm && !loading && (
                <button onClick={handleClear}>
                  <AiOutlineCloseCircle className="text-[18px] hover:scale-110" />
                </button>
              )}

              {loading && (
                <button className="animate-spin">
                  <AiOutlineLoading className="text-[18px]" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-[#ff0000] hover:bg-[#bb4b4b] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2   dark:focus:ring-blue-800"
            >
              {t("search")}
            </button>
          </div>
        </form>
      </div>

      {mediaType !== "people" && (
        <div className="flex gap-6 justify-between md:justify-start mb-4  mx-6 md:mx-0">
          <div>
            <label htmlFor="sort" className="block text-sm font-medium">
              {t("Sortby")}
            </label>
            <select
              id="sort"
              name="sort"
              value={sidebarData.sort}
              onChange={handleFilterChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  rounded-full text-black"
            >
              {sortOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium ">
              {t("category")}
            </label>
            <select
              id="category"
              name="category"
              value={sidebarData.category}
              onChange={handleFilterChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-full text-black"
            >
              <option value="">All</option>
              {listCategory.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium ">
              {t("year")}
            </label>
            <select
              id="year"
              name="year"
              value={sidebarData.year}
              onChange={handleFilterChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-full text-black"
            >
              <option value="">All</option>
              {years.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {filteredMedia.map((movie) => (
          <MediaItem key={movie.id} media={movie} mediaType={mediaType} />
        ))}
      </div>
      {showMore && (
        <div className="flex justify-center mt-4">
          <button
            className="my-6  bg-[#ff0000] text-white py-2 px-4 rounded disabled:opacity-50"
            onClick={handleShowMore}
            disabled={loading}
          >
            {loading ? <AiOutlineLoading /> : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
