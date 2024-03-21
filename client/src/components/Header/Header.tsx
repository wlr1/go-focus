import { useState } from "react";

const Header = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

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
                  <h2 className="font-bold m-auto">jj</h2>
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
                    href="#"
                    className="hover:transition-all hover:translate-x-1 hover:font-semibold"
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
