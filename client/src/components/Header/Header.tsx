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
  const [avatar, setAvatar] = useState("/assets/img/default-avatar.png");

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

        //set user image
        if (response.data.message.Avatar) {
          setAvatar(`${baseUrl}/${response.data.message.Avatar}`);
          console.log(response.data.message.Avatar);
        }
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
    <header className="w-1/2 h-[66px] flex justify-between items-center p-4 mt-4 mx-auto bg-gray-700 text-white rounded-2xl bg-opacity-80">
      <h1 className="font-bold text-xl">noteXs</h1>
      <nav>
        <img
          src={avatar}
          className="w-11 h-11 mr-8 cursor-pointer rounded-full"
          alt="user_img"
          onClick={toggleDropDown}
        />

        {isDropDownOpen && (
          <div className="absolute top-[111px] right-[420px] w-[190px] bg-white shadow-md p-4 rounded-md border border-gray-200">
            <div>
              <ul className="text-black">
                <li className="flex items-center mb-3">
                  <img
                    src={avatar}
                    alt=""
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <h2 className="font-bold">{username}</h2>
                </li>
                <hr className="border-b border-gray-200 mb-3"></hr>
                <li className="flex items-center mb-3 transition duration-300 ease-in-out transform hover:translate-x-1">
                  <FaUserEdit size={21} className="mr-2" />
                  <a onClick={toggleProfile} className="cursor-pointer">
                    Profile
                  </a>
                </li>
                <li className="flex items-center mb-3 transition duration-300 ease-in-out transform hover:translate-x-1">
                  <RiSettings4Fill size={21} className="mr-2" />
                  <a href="#">Settings</a>
                </li>
                <li className="flex items-center transition duration-300 ease-in-out transform hover:translate-x-1">
                  <IoLogOutSharp size={21} className="mr-2" />
                  <a onClick={LogoutUser} className="cursor-pointer">
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
