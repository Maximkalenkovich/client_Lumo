import useUserStore from "@/store/store";

const API_BASE_URL = "http://localhost:3009/api/auth";

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};

export const fetchProfile = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return response.json();
};

export const logout = () => {
  localStorage.removeItem("jwtToken"); // Удаляем токен перед сбросом пользователя
  useUserStore.getState().clearUser();
};
