import { FiEdit3 } from "react-icons/fi";
import { Link } from "react-router-dom";

const StartPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-bgmain  bg-cover bg-center relative">
      <div
        className={"absolute inset-0 bg-opacity-50 backdrop-blur-md"}
        style={{ backdropFilter: "blur(11px)" }}
      ></div>
      <div className="bg-white shadow-lg rounded-lg p-8 opacity-90">
        <div className="flex items-center justify-center mb-4">
          <FiEdit3 className="text-4xl text-blue-500 mr-2" />
          <h1 className="text-4xl font-bold">Notes App</h1>
        </div>
        <p className="text-gray-700 mb-6">
          Welcome to our notes app. Write, save, and organize your notes
          effortlessly.
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
