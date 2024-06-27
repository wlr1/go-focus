import axios from "axios";
import { useEffect, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { toast } from "react-toastify";
import useSound from "use-sound";

import buttonSfx from "../../../sounds/button.mp3";

const baseUrl = "http://localhost:8000";

interface PomoProps {
  duration: number;
}

const PomoContent: React.FC<PomoProps> = ({ duration }) => {
  const [currentDuration, setCurrentDuration] = useState<number>(duration);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const [play] = useSound(buttonSfx, { volume: 0.1 });
  const [stop] = useSound(buttonSfx, { volume: 0.1 });

  useEffect(() => {
    setCurrentDuration(duration);
  }, [duration]);

  //start timer
  const startPomodoro = () => {
    axios
      .post(`${baseUrl}/pomodoro/start`, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setIsActive(true);
          play();

          //start timer
          const id = setInterval(() => {
            setCurrentDuration((prevDuration) => {
              if (prevDuration <= 1) {
                clearInterval(id);
                setIsActive(false);
                play();
                return 0;
              }
              return prevDuration - 1;
            });
          }, 1000);
          setTimerId(id);
        }
      })
      .catch((error) => {
        toast.error(`Failed to start pomodoro: ${error.message}`, {
          theme: "dark",
          autoClose: 3000,
        });
      });
  };

  //stop timer
  const stopPomodoro = () => {
    axios
      .post(`${baseUrl}/pomodoro/stop`, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          if (timerId) {
            clearInterval(timerId);
            setTimerId(null);
          }
          setIsActive(false);
          stop();
        }
      })
      .catch((error) => {
        toast.error(`Failed to stop pomodoro: ${error.message}`, {
          theme: "dark",
          autoClose: 3000,
        });
      });
  };

  //reset timer
  const resetPomodoro = () => {
    axios
      .post(`${baseUrl}/pomodoro/reset`, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          if (timerId) {
            clearInterval(timerId);
            setTimerId(null);
          }
          setIsActive(false);
          setCurrentDuration(response.data.duration);
        }
      })
      .catch((error) => {
        toast.error(`Failed to reset pomodoro: ${error.message}`, {
          theme: "dark",
          autoClose: 3000,
        });
      });
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
        <div className="mb-6">
          {/* <button className="border border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline focus:bg-black">
            Pomodoro
          </button> */}
          <form className="flex justify-between w-[500px] min-h-[69px] m-auto ">
            <input
              type="radio"
              id="pomo"
              name="mode"
              className="opacity-0 fixed w-0"
            />
            <label
              htmlFor="pomo"
              className=" w-[189px] border  border-gray-700 bg-gray-700 text-white text-center text-lg rounded-md px-4 py-2 m-2 transition duration-500 ease select-none cursor-pointer hover:bg-gray-800 focus:outline-none focus:shadow-outline focus:bg-black"
            >
              Pomodoro
            </label>
            <input
              type="radio"
              id="short"
              name="mode"
              className="opacity-0 fixed w-0"
            />
            <label
              htmlFor="short"
              className="border w-[189px] border-gray-700 bg-gray-700 text-white text-center text-lg rounded-md px-4 py-2 m-2 transition duration-500 ease select-none cursor-pointer hover:bg-gray-800 focus:outline-none focus:shadow-outline focus:bg-black"
            >
              Short Break
            </label>
            <input
              type="radio"
              id="long"
              name="mode"
              className="opacity-0 fixed w-0"
            />
            <label
              htmlFor="long"
              className="border w-[189px] border-gray-700 bg-gray-700 text-white text-center text-lg  rounded-md px-4 py-2 m-2 transition duration-500 ease select-none cursor-pointer hover:bg-gray-800 focus:outline-none focus:shadow-outline focus:bg-black"
            >
              Long Break
            </label>
          </form>
        </div>
        <div className="text-center flex justify-center items-center space-x-2">
          <span className="text-white">#1</span>
          <a className="cursor-pointer ">
            <GrPowerReset
              className="text-neutral-300"
              onClick={resetPomodoro}
            />
          </a>
        </div>

        <div className="text-center">
          <span className="font-bold text-[12vh] text-gray-200">
            {formatTime(currentDuration)}
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
