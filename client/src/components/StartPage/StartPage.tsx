import { useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { Link } from "react-router-dom";

const StartPage = () => {
  const [Animation, setAnimation] = useState(false);

  useEffect(() => {
    setAnimation(!Animation);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-bgmain  bg-cover bg-center relative">
      <div
        className="absolute inset-0 bg-opacity-50 backdrop-blur-md"
        style={{ backdropFilter: "blur(11px)" }}
      ></div>
      <div
        className={`bg-white shadow-lg shadow-blue-500 rounded-lg p-8 bg-opacity-90 max-w-[1000px] ${
          Animation ? "fade-start" : ""
        }`}
      >
        <div className="flex items-center justify-center mb-4">
          <FiEdit3 className="text-4xl text-blue-500 mr-2" />
          <h1 className="text-4xl font-bold">go-focus App</h1>
        </div>
        <p className="text-gray-700 mb-6 text-center">
          Welcome to go-focus! Customize your work sessions to match your
          productivity style. Set your preferred timer duration for focused work
          intervals, take breaks when you need them, and stay organized with our
          note-taking features.
        </p>
        <div className="flex justify-center">
          <Link to="/login">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
