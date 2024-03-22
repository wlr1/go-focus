import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [username, setUsername] = useState("");

  const baseUrl = "http://localhost:8000";
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const LogoutUser: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      await axios.get(`${baseUrl}/logout`);

      toast.loading("Success! Redirecting...", {
        theme: "dark",
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate("/login");
        toast.dismiss();
      }, 2000);
    } catch (error: any) {
      toast.error("Logout error", {
        theme: "dark",
        autoClose: 5000,
      });
      console.log("Logout error: ", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/validate`, {
          withCredentials: true, // Include cookies in the request
        });
        console.log(response.data);
        setUsername(response.data.message.Username);
      } catch (error) {
        // Handle error
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <header className="w-full flex justify-between items-center p-4 bg-gray-700 text-white">
      <h1 className="font-bold text-xl">noteXs</h1>
      <nav>
        <img
          src="/assets/img/user.png"
          className="w-9 mr-8 cursor-pointer"
          alt="user_img"
          onClick={toggleDropDown}
        />

        {isDropDownOpen && (
          <div className="absolute top-20 right-6 w-[190px] bg-white shadow-md p-4 rounded-md">
            <div>
              <ul className="text-black">
                <li className="flex">
                  <img
                    src="/assets/img/user.png"
                    alt=""
                    className="w-12 rounded-m mr-1 "
                  />
                  <h2 className="font-bold m-auto">{username}</h2>
                </li>
                <hr className="w-full bg-black h-[1px] border-0 mt-[15px] mb-[10px]"></hr>
                <li className="flex text-center ">
                  <img
                    src="/assets/img/profile.png"
                    alt="profile_img"
                    className="w-6 mr-2"
                  />
                  <a
                    href="#"
                    className="hover:transition-all hover:translate-x-1 hover:font-semibold"
                  >
                    Profile
                  </a>
                </li>
                <li className="flex text-center">
                  <img
                    src="/assets/img/setting.png"
                    alt="settings_img"
                    className="w-6 mr-2"
                  />
                  <a
                    href="#"
                    className="hover:transition-all hover:translate-x-1 hover:font-semibold"
                  >
                    Settings
                  </a>
                </li>
                <li className="flex text-center ">
                  <img
                    src="/assets/img/logout.png"
                    alt="logout_img"
                    className="w-6 mr-2 "
                  />
                  <a
                    onClick={LogoutUser}
                    className="hover:transition-all hover:translate-x-1 hover:font-semibold cursor-pointer"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
