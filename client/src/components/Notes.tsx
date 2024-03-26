import { IoChevronDownOutline } from "react-icons/io5";
import Header from "./Header/Header";
import MainPage from "./MainPage/MainPage";
import { useState } from "react";

const Notes = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  const toggleHeader = () => {
    setIsHeaderVisible(!isHeaderVisible);
    setAnimationClass(isHeaderVisible ? "slideTop" : "slideDown");
  };

  const handleAnimationEnd = () => {
    if (!isHeaderVisible) {
      setAnimationClass("");
    }
  };

  return (
    <>
      <div
        className={"absolute inset-0 bg-opacity-50 backdrop-blur-md"}
        style={{ backdropFilter: "blur(11px)" }}
      >
        {isHeaderVisible && (
          <div
            className={` ${animationClass}`}
            onAnimationEnd={handleAnimationEnd}
          >
            <Header />
          </div>
        )}
        <IoChevronDownOutline
          size={21}
          color="white"
          className="mx-auto hover:scale-125 cursor-pointer"
          onClick={toggleHeader}
        />
      </div>

      <div className="">
        <MainPage />
      </div>
    </>
  );
};

export default Notes;
