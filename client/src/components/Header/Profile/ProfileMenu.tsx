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
    <div className="fade-in fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-600 shadow-xl p-4 rounded-md z-50">
      <div className=" flex justify-end ">
        <MdCloseFullscreen
          size={15}
          onClick={onClose}
          className="cursor-pointer hover:scale-125 "
        />
      </div>
      <h2 className="text-xl font-semibold mb-4">Profile Menu</h2>

      <div className="mb-4">
        <label className="block mb-3">Update Username:</label>
        <input
          type="text"
          placeholder="New Username"
          className="border rounded-md px-2 py-1 w-full mb-2 text-black"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <button
          className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-md mb-3"
          onClick={handleUpdateUsername}
        >
          Update Username
        </button>
      </div>
      <div className="mb-6">
        <label className="block mb-3">Update Password:</label>
        <input
          type="password"
          placeholder="New Password"
          className="border rounded-md px-2 py-1 w-full mb-2 text-black"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />

        <label className="block mb-3">Confirm Password:</label>
        <input
          type="password"
          placeholder="Confirm Password"
          className="border rounded-md px-2 py-1 w-full mb-2 text-black"
          value={confirmNewPass}
          onChange={(e) => setConfirmNewPass(e.target.value)}
        />
        <button
          className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-md"
          onClick={handleUpdatePass}
        >
          Update Password
        </button>
      </div>
      <div>
        <label className="block mb-4">Upload Avatar:</label>
        <div className="flex">
          <label htmlFor="fileInput" className="">
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              className=""
              onChange={(e) => setAvatar(e.target.files?.[0] || null)}
            />
            <button
              className=" ml-4 bg-blue-500 text-white py-1 px-4 rounded-md"
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
