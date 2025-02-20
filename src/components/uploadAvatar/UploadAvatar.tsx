import React, { useState } from "react";
import Image from "next/image";
import { uploadAvatar } from "./../../api/upload-photo.api";

type AvatarProps = {
  userId: number; // ID пользователя для загрузки аватара
  images?: any; // Массив URL изображений
  defaultImage: string; // URL дефолтного изображения
};

export const Avatar: React.FC<AvatarProps> = ({
  userId,
  images = [],
  defaultImage,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<string[]>(images);
  const [isUploading, setIsUploading] = useState(false);
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
const currentImage = images[currentImageIndex]?.url || defaultImage;
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <div style={{ position: "relative", width: 150, height: 150 }}>
        <img
          src={currentImage }
          alt="Avatar"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0, 0, 0, 0.5)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: 30,
                height: 30,
                cursor: "pointer",
              }}
            >
              &lt;
            </button>
            <button
              onClick={handleNextImage}
              style={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0, 0, 0, 0.5)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: 30,
                height: 30,
                cursor: "pointer",
              }}
            >
              &gt;
            </button>
          </>
        )}
      </div>
    </div>
  );
};
