import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "flowbite-react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { removeFavorite } from "../../redux/user/userSlice";
import { setGlobalLoading } from "../../redux/globalLoading/globalLoadingSlice";
import MediaItem from "../MediaItem";
import { useTranslation } from "react-i18next";

const FavoriteItem = ({ media, onRemoved }) => {
  const dispatch = useDispatch();
  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);
    try {
      const res = await axios.delete(
        `/user/favorite/removeFavorite/${media._id}`
      );
      const data = await res.data;
      setOnRequest(false);
      if (data.success) {
        toast.success("Xóa khỏi danh sách yêu thích thành công");
        dispatch(removeFavorite({ mediaId: media.mediaId }));
        onRemoved(media._id);
      }
    } catch (error) {
      setOnRequest(false);
      toast.error("Lỗi khi xóa khỏi danh sách yêu thích");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <MediaItem media={media} mediaType={media.mediaType} />
      <button
        className="bg-red-700 cursor-pointer text-white p-2 rounded-md flex-center hover:scale-110"
        onClick={onRemove}
      >
        <MdDelete className="text-[22px]" />
      </button>
    </div>
  );
};

const DashFavorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [sortOption, setSortOption] = useState("recent");
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const { t } = useTranslation("favorite");

  const skip = 8;

  useEffect(() => {
    const fetchFavorites = async () => {
      dispatch(setGlobalLoading(true));
      try {
        const res = await axios.get("/user/favorites/getFavorite");
        const data = await res.data;
        dispatch(setGlobalLoading(false));
        if (data.success) {
          setFavorites(data.favorite);
          sortFavorites(data.favorite, sortOption);
          setCount(data.favorite.length);
        }
      } catch (error) {
        dispatch(setGlobalLoading(false));
        toast.error("Lỗi lấy danh sách yêu thích");
      }
    };

    fetchFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const sortFavorites = (favorites, option) => {
    const sorted = [...favorites].sort((a, b) => {
      if (option === "recent") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });
    setFilteredFavorites(sorted.slice(0, page * skip));
  };

  const onLoadMore = () => {
    setFilteredFavorites([
      ...filteredFavorites,
      ...favorites.slice(page * skip, (page + 1) * skip),
    ]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    const newFavorites = favorites.filter((favorite) => favorite._id !== id);
    setFavorites(newFavorites);
    sortFavorites(newFavorites, sortOption);
    setCount(count - 1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    sortFavorites(favorites, e.target.value);
  };

  return (
    <div className="w-full">
      <div className="screen-max-width ">
        <div className="flex gap-2 items-center my-4  justify-center md:justify-start">
          <Avatar
            alt="user"
            size="lg"
            img={currentUser.user?.profilePicture}
            rounded
          />
          <div className="flex flex-col gap-3">
            <span className="block text-2xl font-bold">
              @{currentUser.user?.username}
            </span>
            <span className="block text-md font-medium truncate">
              {currentUser.user?.email}
            </span>
          </div>
        </div>
        <div className="my-6 flex justify-between items-center mx-4 md:mx-0">
          <h2 className="text-2xl font-bold">
            {t("listFavorite")}: {count}
          </h2>
          <div className="flex gap-2">
            <select
              className="bg-white dark:bg-black rounded-full"
              onChange={handleSortChange}
              value={sortOption}
            >
              <option value="recent">{t("recently")}</option>
              <option value="oldest">{t("oldest")}</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFavorites.map((media, index) => (
            <FavoriteItem media={media} onRemoved={onRemoved} key={index} />
          ))}
        </div>
        {filteredFavorites.length < favorites.length && (
          <div className="my-4 flex justify-center">
            <button
              onClick={onLoadMore}
              className="bg-[#ff0000] py-2 px-4 rounded text-white"
            >
              {t("showMore")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashFavorite;
