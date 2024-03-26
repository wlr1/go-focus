import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProfileMenu from "./Profile/ProfileMenu";
import { FaUserEdit } from "react-icons/fa";
import { RiSettings4Fill } from "react-icons/ri";
import { IoLogOutSharp } from "react-icons/io5";

const Header = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [username, setUsername] = useState("");

  const baseUrl = "http://localhost:8000";
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  const LogoutUser: React.MouseEventHandler<HTMLAnchorElement> = async (e) => {
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
    } catch (error) {
      toast.error("Logout error", {
        theme: "dark",
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/validate`, {
          withCredentials: true,
        });

        setUsername(response.data.message.Username);
      } catch (error) {
        toast.error("Error fetching data", {
          theme: "dark",
          autoClose: 5000,
        });
      }
    };

    fetchUserData();
  }, []);

  return (
    <header className="w-full h-[66px] flex justify-between items-center p-4 bg-gray-700 text-white">
      <h1 className="font-bold text-xl">noteXs</h1>
      <nav>
        <img
          src="/assets/img/user.png"
          className="w-9 mr-8 cursor-pointer"
          alt="user_img"
          onClick={toggleDropDown}
        />

        {isDropDownOpen && (
          <div className="fade-in absolute top-20 right-6 w-[190px] bg-white shadow-md p-4 rounded-md">
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
                  <FaUserEdit size={21} className="mr-2" />
                  <a
                    onClick={toggleProfile}
                    className="hover:transition-all hover:translate-x-1 hover:font-semibold cursor-pointer"
                  >
                    Profile
                  </a>
                </li>
                <li className="flex text-center">
                  <RiSettings4Fill size={21} className="mr-2" />
                  <a
                    href="#"
                    className="hover:transition-all hover:translate-x-1 hover:font-semibold"
                  >
                    Settings
                  </a>
                </li>
                <li className="flex text-center ">
                  <IoLogOutSharp size={21} className="mr-2" />
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
        {isProfileOpen && <ProfileMenu onClose={closeProfile} />}
      </nav>
    </header>
  );
};

export default Header;
