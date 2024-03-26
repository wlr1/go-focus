import Header from "./Header/Header";
import MainPage from "./MainPage/MainPage";

const Notes = () => {
  return (
    <>
      <div
        className={"absolute inset-0 bg-opacity-50 backdrop-blur-md"}
        style={{ backdropFilter: "blur(11px)" }}
      >
        <Header />
      </div>

      <div className="">
        <MainPage />
      </div>
    </>
  );
};

export default Notes;
