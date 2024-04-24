import React from "react";
import { MdCloseFullscreen } from "react-icons/md";

interface SettingsMenuProps {
  onClose: () => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ onClose }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-xl p-6 rounded-md z-50 max-w-80">
      <div className="flex justify-end">
        <MdCloseFullscreen
          size={20}
          className="cursor-pointer text-gray-300 hover:text-white"
          onClick={onClose}
        />
      </div>
      <h2 className="text-2xl font-semibold text-white mb-6">Settings Menu</h2>
    </div>
  );
};

export default SettingsMenu;
