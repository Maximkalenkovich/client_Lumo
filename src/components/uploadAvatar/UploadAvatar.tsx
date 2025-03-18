"use client";
import React, { useRef, useState } from "react";
import { uploadAvatar } from "@/api/upload-photo.api";
import { FiUpload } from "react-icons/fi"; // Импортируем иконку загрузки
import useUserStore from "@/store/store";
import { fetchProfile } from "@/api/auth";

type UploadAvatarProps = {
  userId: number;
  onUploadSuccess: (image: { id: string; url: string }) => void; // Измененный тип
};

export const UploadAvatar: React.FC<UploadAvatarProps> = ({
  userId,
  onUploadSuccess,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setUser = useUserStore((state) => state.setUser);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      const response = await uploadAvatar(userId, selectedFile);
console.log(response);
      // Предполагаем, что сервер возвращает объект с id и url
      const newAvatar = { id: response.avatar.id, url: response.avatar.url };
       
      console.log(newAvatar)
      onUploadSuccess(newAvatar);

      const token = localStorage.getItem("jwtToken");
      if (token) {
        const updatedProfile = await fetchProfile(token);
        setUser(updatedProfile);
      }
    } catch (error) {
      console.error("Ошибка при загрузке аватара:", error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 p-5 max-w-xs bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl shadow-md">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={isUploading}
        className="hidden"
      />
      <button
        onClick={handleButtonClick}
        disabled={isUploading}
        className="flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full text-white font-semibold tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-lg disabled:bg-gray-300 disabled:opacity-70 disabled:cursor-not-allowed active:translate-y-0.5"
      >
        {isUploading ? (
          "Uploading..."
        ) : (
          <>
            <FiUpload className="w-5 h-5" />
            <span>Upload Avatar</span>
          </>
        )}
      </button>
    </div>
  );
};