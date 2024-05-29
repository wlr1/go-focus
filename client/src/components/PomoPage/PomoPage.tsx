import { useState } from "react";
import Header from "../Header/Header";
import PomoContent from "./PomoContent/PomoContent";

const PomoPage = () => {
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);

  const handlePomodoroTimeChange = (newTime: number) => {
    setPomodoroTime(newTime * 60); //seconds
  };

  return (
    <>
      <Header onPomodoroTimeChange={handlePomodoroTimeChange} />
      <div className="bg-notes min-h-screen flex justify-center items-center">
        <div className="w-full max-w-screen-lg mx-auto">
          <PomoContent pomodoroTime={pomodoroTime} />
        </div>
      </div>
    </>
  );
};

export default PomoPage;
