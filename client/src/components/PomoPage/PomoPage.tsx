import Header from "../Header/Header";
import PomoContent from "./PomoContent/PomoContent";

const SettingsPage = () => {
  return (
    <>
      <Header />
      <div className="bg-notes h-screen flex justify-center items-center">
        <div className="">
          <PomoContent />
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
