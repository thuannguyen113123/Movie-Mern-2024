import { useEffect, useState } from "react";
import MediaItem from "./MediaItem";
import { MovieByPerson } from "../api/apiCall";
import axios from "axios";

const PersonMediaGrid = ({ personId }) => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const skip = 8;

  useEffect(() => {
    const getMedias = async () => {
      try {
        const res = await axios.get(MovieByPerson(personId));
        if (res.data && res.data.cast) {
          const mediasSorted = res.data.cast.sort(
            (a, b) => getReleaseDate(b) - getReleaseDate(a)
          );
          setMedias([...mediasSorted]);
          setFilteredMedias([...mediasSorted].splice(0, skip));
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getMedias();
  }, [personId]);

  const getReleaseDate = (media) => {
    const date =
      media.media_type === "movie"
        ? new Date(media.release_date)
        : new Date(media.first_air_date);
    return date.getTime();
  };

  const onLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMedias.map((media, index) => (
          <MediaItem
            key={media.id}
            media={media}
            mediaType={media.media_type}
          />
        ))}
      </div>
      {filteredMedias.length < medias.length && (
        <div className="w-full flex justify-center items-center my-4">
          <button
            onClick={onLoadMore}
            className="mt-8  bg-[#ff0000] text-white py-2 px-4 rounded disabled:opacity-50"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default PersonMediaGrid;
