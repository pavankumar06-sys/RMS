import { useRef, useState, useEffect } from "react";
import { FiCamera } from "react-icons/fi";

export default function ProfileAvatar() {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("profileImage");
    if (stored) setImage(stored);
  }, []);

  const handleSelect = () => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      localStorage.setItem("profileImage", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const initial =
    localStorage.getItem("userName")?.charAt(0).toUpperCase() || "U";

  return (
    <div className="relative">
      {/* AVATAR */}
      <div
        onClick={handleSelect}
        className="w-14 h-14 rounded-full border bg-blue-50 flex items-center justify-center overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-400 transition"
        title="Change profile picture"
      >
        {image ? (
          <img
            src={image}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xl font-semibold text-blue-600">
            {initial}
          </span>
        )}
      </div>

      {/* CAMERA ICON */}
      <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full shadow">
        <FiCamera size={12} />
      </div>

      {/* FILE INPUT */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}