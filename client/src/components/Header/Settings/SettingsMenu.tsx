import React, { useState } from "react";
import { MdCloseFullscreen, MdOutlineTimer } from "react-icons/md";

interface SettingsMenuProps {
  onClose: () => void;
  onPomodoroTimeChange: (newTime: number) => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({
  onClose,
  onPomodoroTimeChange,
}) => {
  const [pomodoroInput, setPomodoroInput] = useState(25);

  const handlePomodoroInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTime = parseInt(e.target.value, 10);
    setPomodoroInput(newTime);
    onPomodoroTimeChange(newTime);
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
      <h2 className="text-md font-bold mt-2">Time (Minutes)</h2>
      <div className="grid grid-cols-3 space-x-3 text-left">
        <div className="">
          <label className="">
            <h1 className="mb-1 text-gray-300">Pomodoro</h1>
          </label>
          <input
            type="number"
            min={0}
            step={1}
            value={pomodoroInput}
            onChange={handlePomodoroInputChange}
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
      </div>
    </div>
  );
};

export default SettingsMenu;
