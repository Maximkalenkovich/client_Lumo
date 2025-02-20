import axios from "axios";

const API_BASE_URL = "http://localhost:3009/api";

export const updateGender = async (
  userId: number,
  gender: "male" | "female"
) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/users/user/${userId}/gender`,
      { gender }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating gender:", error);
    throw error;
  }
};
