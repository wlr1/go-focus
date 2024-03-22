import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [isFormAnimation, setIsFormAnimation] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const baseUrl = "http://localhost:8000";

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/login`, {
        email,
        password,
      });
      navigate("/notes");
    } catch (error: any) {
      console.error("Signup Error:", error);
      setError(error.response.data.error);
    }
  };

  useEffect(() => {
    setIsFormAnimation(!isFormAnimation);
  }, []);

  return (
    <div
      className="flex items-center justify-center h-screen overflow-hidden"
      style={{
        backgroundImage:
          'url("https://images.hdqwalls.com/download/xiaomi-mi-gaming-laptop-abstract-4k-hl-1920x1080.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className={`bg-white p-8 rounded-md shadow-xl w-96 ${
          isFormAnimation ? "slideUp" : ""
        }`}
      >
        <h2 className="text-3xl font-extrabold mb-4 text-gray-800">Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email:
            </label>
            <input
              type="text"
              id="email"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-md hover:from-blue-600 hover:to-blue-700 focus:outline-none mb-1"
          >
            Sign In
          </button>

          <span className="text-sm">
            Don't have an account yet? Just{" "}
            <Link to="/register" className="underline text-blue-600">
              {" "}
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
