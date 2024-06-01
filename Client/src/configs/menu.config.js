import { MdHome, MdSlideshow, MdLiveTv, MdSearch } from "react-icons/md";

const main = [
  {
    display: "home",
    path: "/",
    icon: <MdHome />,
    state: "home",
  },
  {
    display: "movies",
    path: "/movie",
    icon: <MdSlideshow />,
    state: "movie",
  },
  {
    display: "tv series",
    path: "/tv",
    icon: <MdLiveTv />,
    state: "tv",
  },
  {
    display: "search",
    path: "/search",
    icon: <MdSearch />,
    state: "search",
  },
];

const menuConfigs = { main };

export default menuConfigs;
