import axios from "axios";
import { useEffect, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { toast } from "react-toastify";
import useSound from "use-sound";

import buttonSfx from "../../../sounds/button.mp3";

const baseUrl = "http://localhost:8000";

const PomoContent = () => {
  const [duration, setDuration] = useState<number>(25 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);

  const [play] = useSound(buttonSfx, { volume: 0.1 });
  const [stop] = useSound(buttonSfx, { volume: 0.1 });

  useEffect(() => {
    axios
      .get(`${baseUrl}/pomodoro/get-duration`, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setDuration(response.data.duration);
        }
      })
      .catch((error) => {
        toast.error(`Failed to fetch pomodoro duration: ${error.message}`, {
          theme: "dark",
          autoClose: 3000,
        });
      });
  }, []);

  const startPomodoro = () => {
    setIsActive(true);
    play();
  };

  const stopPomodoro = () => {
    setIsActive(false);
    stop();
  };

  //format time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  return (
    <div className="px-4">
      <div className="max-w-[600px] mx-auto bg-darkpal rounded-xl shadow-custom  shadow-gray-700 p-8 ">
        <div className="grid grid-cols-3 text-center text-md mb-6">
          <button className="border border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline focus:bg-black">
            Pomodoro
          </button>
          <button className="border border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline focus:bg-black">
            Short Break
          </button>
          <button className="border border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline focus:bg-black">
            Long Break
          </button>
        </div>
        <div className="text-center flex justify-center items-center space-x-2">
          <span className="text-white">#1</span>
          <a className="cursor-pointer ">
            <GrPowerReset className="text-neutral-300" />
          </a>
        </div>

        <div className="text-center">
          <span className="font-bold text-[12vh] text-gray-200">
            {formatTime(duration)}
          </span>
        </div>
        <div className="text-center mt-6">
          {isActive ? (
            <button
              className="px-8 py-2 border-b-4  border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition-all duration-200"
              onClick={stopPomodoro}
            >
              Stop
            </button>
          ) : (
            <button
              className="px-8 py-2 border-b-4 border-green-500 text-green-500 hover:text-white hover:bg-green-500 transition-all duration-200"
              onClick={startPomodoro}
            >
              Start
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PomoContent;
