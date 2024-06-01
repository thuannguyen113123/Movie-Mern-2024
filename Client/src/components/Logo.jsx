import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <div className="font-bold text-[1.7rem]">
        Thuan<span className="text-[#ff0000]">Movie</span>
      </div>
    </Link>
  );
};

export default Logo;
