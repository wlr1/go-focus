import { MdCloseFullscreen } from "react-icons/md";

interface ProfileMenuProps {
  onClose: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ onClose }) => {
  return (
    <div className="fade-in fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-600 shadow-xl p-4 rounded-md z-50">
      <div className=" flex justify-end">
        <MdCloseFullscreen
          size={15}
          onClick={onClose}
          className="cursor-pointer hover:scale-125"
        />
      </div>
      <h2 className="text-xl font-semibold mb-4">Profile Menu</h2>

      <div className="mb-4">
        <label className="block mb-3">Update Username:</label>
        <input
          type="text"
          placeholder="New Username"
          className="border rounded-md px-2 py-1 w-full mb-2"
        />
        <button className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-md mb-3">
          Update Username
        </button>
      </div>
      <div className="mb-6">
        <label className="block mb-3">Update Password:</label>
        <input
          type="password"
          placeholder="New Password"
          className="border rounded-md px-2 py-1 w-full mb-2"
        />

        <label className="block mb-3">Confirm Password:</label>
        <input
          type="password"
          placeholder="Confirm Password"
          className="border rounded-md px-2 py-1 w-full mb-2"
        />
        <button className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-md">
          Update Password
        </button>
      </div>
      <div>
        <label className="block mb-3">Upload Avatar:</label>
        <input type="file" accept="image/*" />
      </div>
    </div>
  );
};

export default ProfileMenu;
