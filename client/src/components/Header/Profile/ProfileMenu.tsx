import axios from "axios";
import { useState } from "react";
import { MdCloseFullscreen } from "react-icons/md";
import { toast } from "react-toastify";

interface ProfileMenuProps {
  onClose: () => void;
}

const baseUrl = "http://localhost:8000";

const ProfileMenu: React.FC<ProfileMenuProps> = ({ onClose }) => {
  const [newUsername, setNewUsername] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);

  //update username
  const handleUpdateUsername = async () => {
    try {
      await axios.put(
        `${baseUrl}/update-user`,
        { username: newUsername },
        { withCredentials: true }
      );

      toast.success("Username updated successfully", {
        theme: "dark",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Cannot update username", {
        theme: "dark",
        autoClose: 3000,
      });
    }
  };

  //update pass
  const handleUpdatePass = async () => {
    if (newPass !== confirmNewPass) {
      toast.error("Passwords do not match!", {
        theme: "dark",
        autoClose: 3000,
      });
      return;
    }

    try {
      await axios.put(
        `${baseUrl}/update-password`,
        { NewPassword: newPass },
        { withCredentials: true }
      );

      toast.success("Password updated successfully", {
        theme: "dark",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Cannot update password", {
        theme: "dark",
        autoClose: 3000,
      });
    }
  };

  //upload avatar
  const handleAvatarUpload = async () => {
    if (!avatar) {
      toast.error("Please select an image to upload", {
        theme: "dark",
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      await axios.post(`${baseUrl}/upload-avatar`, formData, {
        withCredentials: true,
      });
      toast.success("Avatar updated successfully", {
        theme: "dark",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Failed to update avatar", {
        theme: "dark",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-xl p-6 rounded-md z-50 w-80">
      <div className="flex justify-end">
        <MdCloseFullscreen
          size={20}
          onClick={onClose}
          className="cursor-pointer text-gray-300 hover:text-white"
        />
      </div>
      <h2 className="text-2xl font-semibold text-white mb-6">Profile Menu</h2>
      <hr className="border-b border-gray-400 mb-8 mx-auto"></hr>
      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Update Username:</label>
        <input
          type="text"
          placeholder="New Username"
          className="border rounded-md px-3 py-2 w-full mb-2 text-gray-900 bg-gray-200"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full transition duration-300"
          onClick={handleUpdateUsername}
        >
          Update Username
        </button>
      </div>
      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Update Password:</label>
        <input
          type="password"
          placeholder="New Password"
          className="border rounded-md px-3 py-2 w-full mb-2 text-gray-900 bg-gray-200"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="border rounded-md px-3 py-2 w-full mb-4 text-gray-900 bg-gray-200"
          value={confirmNewPass}
          onChange={(e) => setConfirmNewPass(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full transition duration-300"
          onClick={handleUpdatePass}
        >
          Update Password
        </button>
      </div>
      <div>
        <label className="block text-gray-300 mb-2">Upload Avatar:</label>
        <div className="flex items-center">
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            className=""
            onChange={(e) => setAvatar(e.target.files?.[0] || null)}
          />
          <label htmlFor="fileInput" className="cursor-pointer">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full transition duration-300"
              onClick={handleAvatarUpload}
            >
              Upload
            </button>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
