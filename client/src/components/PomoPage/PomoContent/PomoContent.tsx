import React from "react";

const PomoContent = () => {
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

        <div className="text-center">
          <span className="font-bold text-[12vh] text-gray-200">60:00</span>
        </div>
        <div className="text-center mt-6">
          <button className="px-8 py-2 border-b-4 border-green-500 text-green-500 hover:text-white hover:bg-green-500 transition-all duration-200">
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

// <button class="px-4 py-2 border-b-4 border border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition-all duration-200">Button 2</button>

export default PomoContent;
