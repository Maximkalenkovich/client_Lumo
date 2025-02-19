"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/store";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (user) {
      router.push("/profile"); // Если пользователь уже есть, перенаправляем
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3009/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      const token = data.token;
      localStorage.setItem("jwtToken", token);

      // После успешного входа загружаем профиль
      const profileResponse = await fetch(
        "http://localhost:3009/api/auth/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!profileResponse.ok) {
        throw new Error("Failed to fetch profile");
      }

      const profileData = await profileResponse.json();

      // Сохраняем пользователя в Zustand
      setUser(profileData);

      // Перенаправляем на профиль
      router.push("/profile");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-pink-500 text-center mb-4">
          LUMO
        </h1>
        <div className="flex border border-gray-300 rounded-md mb-4">
          <button
            type="button"
            className={`w-1/2 py-2 text-center ${
              isLogin ? "bg-white font-bold" : "bg-gray-200"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            type="button"
            className={`w-1/2 py-2 text-center ${
              !isLogin ? "bg-white font-bold" : "bg-gray-200"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Email or Phone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900"
        >
          Login
        </button>
        <p className="text-center text-gray-600 text-sm mt-4">
          Or continue with
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <button className="w-10 h-10 flex items-center justify-center border rounded-md">
            <i className="fab fa-facebook-f"></i>
          </button>
          <button className="w-10 h-10 flex items-center justify-center border rounded-md">
            <i className="fab fa-instagram"></i>
          </button>
          <button className="w-10 h-10 flex items-center justify-center border rounded-md">
            <i className="fab fa-google"></i>
          </button>
        </div>
      </form>
    </div>
  );
}
