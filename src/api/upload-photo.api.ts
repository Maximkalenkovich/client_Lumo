import { API_BASE_URL } from "./apiBase";

export const uploadAvatar = async (userId: number, file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${API_BASE_URL}/avatar/user/${userId}/avatar`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload avatar");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error uploading avatar:", error);
    throw error;
  }
};