import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrPowerReset } from "react-icons/gr";

const baseUrl = "http://localhost:8000";

const PomoContent = () => {
  const [timer, setTimer] = useState(1500);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    } else if (!isActive && timer !== 0) {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timer]);

  const startPomodoro = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/pomodoro/start`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setTimer(1500);
        setIsActive(true);
      }
    } catch (error) {
      console.error("Failed to start pomodoro", error);
    }
  };

  const stopPomodoro = () => {
    setIsActive(false);
  };

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
          <a className="cursor-pointer">
            <GrPowerReset className="text-neutral-300" />
          </a>
        </div>

        <div className="text-center">
          <span className="font-bold text-[12vh] text-gray-200">
            {formatTime(timer)}
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
