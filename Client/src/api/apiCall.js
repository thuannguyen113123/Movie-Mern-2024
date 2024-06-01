export const apikey = process.env.REACT_APP_API_KEY_Movie;
export const NEWS_API_KEY = process.env.REACT_APP_API_KEY_News;

export const NEWS_API_URL = (pageSize) => {
  return `https://newsapi.org/v2/everything?q=movies&sortBy=publishedAt&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
};

export const baseImagePath = (size, path) => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const backdropMedia = (mediaType, id) => {
  return `https://api.themoviedb.org/3/${mediaType}/${id}/images?api_key=${apikey}`;
};
// Media đang chiếu (phim hoặc TV show)
export const nowPlayingMedia = (mediaType) => {
  return `https://api.themoviedb.org/3/${mediaType}/now_playing?api_key=${apikey}`;
};

// Media sắp chiếu (phim )
export const upcomingMedia = (mediaType) => {
  return `https://api.themoviedb.org/3/${mediaType}/upcoming?api_key=${apikey}`;
};
//  TV show phát sóng hôm này
export const airingTodayMedia = (mediaType) => {
  return `https://api.themoviedb.org/3/${mediaType}/airing_today?api_key=${apikey}`;
};

// Media phổ biến (phim hoặc TV show)
export const popularMedia = (mediaType) => {
  return `https://api.themoviedb.org/3/${mediaType}/popular?api_key=${apikey}`;
};

// Media được đánh giá cao (phim hoặc TV show)
export const topRatedMedia = (mediaType) => {
  return `https://api.themoviedb.org/3/${mediaType}/top_rated?api_key=${apikey}`;
};

// Lấy phim theo thể loại
export const genreMediaAPI = (mediaType, id, page = 1) => {
  return `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${apikey}&with_genres=${id}&page=${page}`;
};

// Chi tiết phim hoặc TV show
export const mediaDetails = (mediaType, id) => {
  return `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${apikey}`;
};
export const mediaByCast = (mediaType, id) => {
  return `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${apikey}`;
};

// Chi tiết diễn viên của phim hoặc TV show
export const CastDetails = (id) => {
  return `https://api.themoviedb.org/3/person/${id}?api_key=${apikey}`;
};

// Lấy thể loại của phim hoặc TV show
export const fetchGenres = (mediaType) => {
  return `https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=${apikey}`;
};

// Đường dẫn video của phim hoặc TV show
export const mediaVideos = (mediaType, id) => {
  return `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${apikey}`;
};
//Lấy phim theo nhân vật
export const MovieByPerson = (id) => {
  return `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apikey}`;
};
//Media đề xuất
export const mediaRecommend = (mediaType, id) => {
  return `https://api.themoviedb.org/3/${mediaType}/${id}/recommendations?api_key=${apikey}`;
};
// Tìm kiếm phim hoặc TV show và nhân vật
export const searchMedia = (mediaType, keyword, sort, category, year, page) => {
  const baseEndpoint =
    mediaType === "people"
      ? `https://api.themoviedb.org/3/search/person?api_key=${apikey}&query=${keyword}`
      : `https://api.themoviedb.org/3/search/${mediaType}?api_key=${apikey}&query=${keyword}`;

  return `${baseEndpoint}&sort_by=${sort}&with_genres=${category}&year=${year}&page=${page}`;
};

// Đường dẫn hình nền
export const backdropPath = (imgEndpoint) =>
  `https://image.tmdb.org/t/p/original${imgEndpoint}`;

// Đường dẫn poster
export const posterPath = (imgEndpoint) =>
  `https://image.tmdb.org/t/p/w500${imgEndpoint}`;

// Đường dẫn YouTube
export const youtubePath = (videoId) =>
  `https://www.youtube.com/embed/${videoId}?controls=0`;
