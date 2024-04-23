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
    <div className="bg-notes bg-cover bg-center h-screen flex">
      <div
        className={"absolute inset-0 bg-opacity-50 backdrop-blur-md z-10"}
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
      <div className="z-20 w-[10px]">
        <MainPage />
      </div>
    </div>
  );
};

export default Notes;

//#TODO
{
  /*  
I have idea. I can transfer current note page to profile settings, so when u logged in, u redirected to the profile settings(current /notes) page, and there i create a button who redirects user to the notes main page. With that behavior i can remove header in notes page and it will be much easier to create a notes cards.

UPD1: I have videos about notes cards in my videobs folder
*/
}
