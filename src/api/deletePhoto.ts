import { API_BASE_URL } from "./apiBase";


export const deleteAvatar = async (userId: number, photoId: string) => {
    
    try {
      const response = await fetch(
        `${API_BASE_URL}/avatar/user/${userId}/avatar/${photoId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`Ошибка при удалении аватара: ${response.status}`);
      }
  
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error("Ошибка в deleteAvatar:", error);
      throw error;
    }
  };