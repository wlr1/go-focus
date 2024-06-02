import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProfileMenu from "./Profile/ProfileMenu";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa";
import { RiSettings4Fill } from "react-icons/ri";
import { IoLogOutSharp, IoStatsChartSharp } from "react-icons/io5";
import SettingsMenu from "./Settings/SettingsMenu";

const Header = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("/assets/img/default-avatar.png");

  const baseUrl = "http://localhost:8000";
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const onUpdateUsername = (newUsername: string) => {
    setUsername(newUsername);
  };

  const onUpdateAvatar = (newAvatar: string) => {
    setAvatar(newAvatar);
  };

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
    setIsProfileOpen(false);
    setIsSettingsOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  //logout
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

  //delete
  const DeleteUser: React.MouseEventHandler<HTMLAnchorElement> = async (e) => {
    e.preventDefault();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmDelete) {
      return; //user cancelled
    }
    try {
      await axios.delete(`${baseUrl}/delete-user`);

      toast.success("User deleted!", {
        theme: "dark",
        autoClose: 1300,
      });

      setTimeout(() => {
        if (!document.cookie) {
          navigate("/login");
        }
      }, 2000);
    } catch (error) {
      toast.error("Failed to delete user", {
        theme: "dark",
        autoClose: 5000,
      });
    }
  };

  //validate
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
    <header className=" w-1/2 fixed top-4 rounded-3xl bg-gray-700 bg-opacity-80 text-white mx-auto left-1/4">
      <div className=" h-[44px] flex justify-between  items-center p-4 mt-4 ">
        <h1 className="font-bold text-xl mb-4">go-focus</h1>
        <nav className="flex text-center items-center">
          <img
            src={avatar}
            className="w-9 h-9 mr-4 mb-4 cursor-pointer rounded-full"
            alt="user_img"
            onClick={toggleDropDown}
          />
          {isDropDownOpen && (
            <div className="fixed top-[10%] w-[190px] bg-white shadow-md p-4 rounded-md border border-gray-200">
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
                  <hr className="border-b border-gray-200 my-3 w-[111px] mx-auto"></hr>
                  <li className="flex items-center mb-3 transition duration-300 ease-in-out transform hover:translate-x-1">
                    <FaUserEdit size={21} className="mr-2" />
                    <a onClick={toggleProfile} className="cursor-pointer">
                      Profile
                    </a>
                  </li>
                  <li className="flex items-center mb-3 transition duration-300 ease-in-out transform hover:translate-x-1">
                    <RiSettings4Fill size={21} className="mr-2" />
                    <a onClick={toggleSettings} className="cursor-pointer">
                      Settings
                    </a>
                  </li>
                  <li className="flex items-center mb-3 transition duration-300 ease-in-out transform hover:translate-x-1">
                    <IoStatsChartSharp size={21} className="mr-2 " />
                    <a className="cursor-pointer">Statistics</a>
                  </li>
                  <li className="flex items-center transition duration-300 ease-in-out transform hover:translate-x-1">
                    <IoLogOutSharp size={21} className="mr-2" />
                    <a onClick={LogoutUser} className="cursor-pointer">
                      Logout
                    </a>
                  </li>
                  <hr className="border-b border-gray-200 my-3 w-[111px] mx-auto"></hr>
                  <li className="flex items-center transition duration-300 ease-in-out transform hover:translate-x-1">
                    <FaTrashAlt size={19} className="mr-2" color="red" />
                    <a className="cursor-pointer" onClick={DeleteUser}>
                      Delete Account
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {isProfileOpen && (
            <ProfileMenu
              onClose={closeProfile}
              onUpdateUsername={onUpdateUsername}
              onUpdateAvatar={onUpdateAvatar}
            />
          )}
          {isSettingsOpen && <SettingsMenu onClose={closeSettings} />}
        </nav>
      </div>
    </header>
  );
};

export default Header;
