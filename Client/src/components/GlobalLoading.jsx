import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const GlobalLoading = () => {
  const { globalLoading } = useSelector((state) => state.globalLoading);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (globalLoading) {
      setIsLoading(true);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [globalLoading]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-black transition-opacity duration-300 ${
          isLoading
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute top-0 left-0 w-full">
          {isLoading && <div className="h-1 bg-[#ff0000] animate-pulse"></div>}
        </div>
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <Logo />
        </div>
      </div>
    </>
  );
};

export default GlobalLoading;
