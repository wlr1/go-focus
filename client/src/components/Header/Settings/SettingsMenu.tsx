import axios from "axios";
import React, { useState } from "react";
import { MdCloseFullscreen, MdOutlineTimer } from "react-icons/md";
import { toast } from "react-toastify";

interface SettingsMenuProps {
  onClose: () => void;
}

const baseUrl = "http://localhost:8000";

const SettingsMenu: React.FC<SettingsMenuProps> = ({ onClose }) => {
  const [pomodoroDuration, setPomodoroDuration] = useState<number>(25);

  const saveSettings = () => {
    axios
      .post(`${baseUrl}/pomodoro/set-duration`, {
        duration: pomodoroDuration * 60,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Settings saved successfully");
        }
      })
      .catch((error) => {
        toast.error("Failed to save settings", error.message);
      });
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-xl p-6 rounded-md z-50 max-w-[329px]">
      <div className="flex justify-end">
        <MdCloseFullscreen
          size={20}
          className="cursor-pointer text-gray-300 hover:text-white"
          onClick={onClose}
        />
      </div>
      <h2 className="text-2xl font-semibold text-white mb-6">Settings Menu</h2>
      <hr className="border-b border-gray-400 mb-8 mx-auto"></hr>
      {/* timer */}
      <div className="flex items-center">
        <MdOutlineTimer size={20} color="gray" className="mr-1 " />
        <h2 className="text-md text-gray-400">Timer</h2>
      </div>
      <h2 className="text-md font-bold mt-2 text-left">Time (Minutes)</h2>
      <div className="grid grid-cols-3 space-x-3 text-left">
        <div className="">
          <label className="">
            <h1 className="mb-1 text-gray-300">Pomodoro</h1>
          </label>
          <input
            type="number"
            min={0}
            step={1}
            value={pomodoroDuration}
            onChange={(e) => setPomodoroDuration(Number(e.target.value))}
            className="w-16 text-black rounded-lg p-1 bg-gray-300 focus:outline-none focus:shadow-outline shadow-inner shadow-black"
          />
        </div>
        <div>
          <label>
            <h1 className="mb-1 text-gray-300">Short Break</h1>
          </label>
          <input
            type="number"
            min={0}
            step={1}
            className="w-16 text-black  rounded-lg p-1 bg-gray-300 focus:outline-none focus:shadow-outline shadow-inner shadow-black"
          />
        </div>
        <div>
          <label>
            <h1 className="mb-1 text-gray-300">Long Break</h1>
          </label>
          <input
            type="number"
            min={0}
            step={1}
            className="w-16 text-black  rounded-lg p-1 bg-gray-300 focus:outline-none focus:shadow-outline shadow-inner shadow-black"
          />
        </div>
        <button
          onClick={saveSettings}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-all duration-200"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SettingsMenu;
