import axios from "axios";
import { useState, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [isFormAnimation, setIsFormAnimation] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const baseUrl = "http://localhost:8000";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${baseUrl}/signup`, {
        Email: email,
        Password: password,
        Username: name,
      });
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (error: any) {
      toast.error("Signup error", {
        theme: "dark",
        autoClose: 5000,
      });
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error, {
          theme: "dark",
          autoClose: 5000,
        });
      } else {
        toast.error("An unexpected error occurred.", {
          theme: "dark",
          autoClose: 5000,
        });
      }
    }
  };

  useLayoutEffect(() => {
    setIsFormAnimation(true);

    return () => {
      setIsFormAnimation(false);
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-bgmain bg-cover bg-center">
      <div
        className={"absolute inset-0 bg-opacity-50 backdrop-blur-md"}
        style={{ backdropFilter: "blur(11px)" }}
      ></div>
      <div
        className={`bg-white p-8 rounded-md shadow-md w-96 relative bg-opacity-80 ${
          isFormAnimation ? "slideUp" : ""
        }`}
      >
        <h2 className="text-3xl font-extrabold mb-4 text-gray-800">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email:
            </label>
            <input
              type="email"
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

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-md hover:from-blue-600 hover:to-blue-700 focus:outline-none mb-2"
          >
            Sign Up
          </button>
          <span className="text-sm">
            Back to{" "}
            <Link to="/login" className="underline text-blue-600">
              Sign In
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
