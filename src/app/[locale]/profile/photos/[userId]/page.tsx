"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useUserStore from "@/store/store";
import { fetchProfile } from "@/api/auth";
import { deleteAvatar } from "@/api/deletePhoto";
import { UploadAvatar } from "@/components/uploadAvatar/UploadAvatar";

type AvatarImage = {
  id: string;
  url: string;
};

const convertBackendUrlToFrontend = (backendUrl: string): string => {
  if (!backendUrl) return backendUrl;
  return backendUrl.replace(
    "https://s3.storage.selcloud.ru/lumo",
    "https://2f324278-b72a-49ee-8fad-0ed2fa1b580f.selstorage.ru"
  );
};

export default function PhotosPage() {
  const { userId } = useParams(); // Получаем userId из URL
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [images, setImages] = useState<AvatarImage[]>([]);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("jwtToken");
      if (token && (!user || user.id !== Number(userId))) {
        const profile = await fetchProfile(token);
        setUser(profile);
        setImages(profile.avatars || []);
      } else if (user) {
        setImages(user.avatars || []);
      }
    };
    loadProfile();
  }, [user, userId, setUser]);

  const handleUploadSuccess = (image: AvatarImage) => {
    setImages([...images, image]);
  };

  const handleDeleteImage = async (photoId: string) => {
    if (!photoId || !user) {
      console.error("Photo ID или user не найден");
      return;
    }

    try {
      await deleteAvatar(user.id, photoId);
      const token = localStorage.getItem("jwtToken");
      if (token) {
        const updatedProfile = await fetchProfile(token);
        setUser(updatedProfile);
        setImages(updatedProfile.avatars || []);
      } else {
        console.error("Токен не найден в localStorage");
      }
    } catch (error) {
      console.error("Не удалось удалить фото:", error);
    }
  };

  const transformedImages = images.map((image) => ({
    ...image,
    url: convertBackendUrlToFrontend(image.url),
  }));

  const openImage = (url: string) => {
    setSelectedImage(url);
    setIsImageOpen(true);
  };

  if (!user || user.id !== Number(userId)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Фото</h1>
        {/* Список фото */}
        // Внутри PhotosPage
        {transformedImages.length > 0 ? (
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {transformedImages
              .filter((image) => image.url) // Фильтруем изображения без URL
              .map((image) => (
                <li key={image.id} className="relative">
                  <img
                    src={image.url}
                    alt={"f3f"}
                    className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => openImage(image.url)}
                  />
                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-200"
                  >
                    ✕
                  </button>
                </li>
              ))}
          </ul>
        ) : (
          <p>вуацу</p>
        )}
        {/* Модальное окно для увеличенного фото */}
        {isImageOpen && selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setIsImageOpen(false)}
          >
            <img
              src={selectedImage}
              alt="Full size photo"
              className="max-w-[90%] max-h-[90%] rounded-lg"
            />
          </div>
        )}
        {/* Кнопка загрузки */}
        <div className="mt-4">
          <UploadAvatar
            userId={user.id}
            onUploadSuccess={handleUploadSuccess}
          />
        </div>
      </div>
    </div>
  );
}
