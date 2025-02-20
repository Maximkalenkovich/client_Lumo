// components/LoginPage.tsx

"use client";

import { useEffect, useState } from "react";
import useUserStore from "@/store/store";
import { login, fetchProfile } from "@/api/auth";
import { usePathname, useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, setUser } = useUserStore();
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const pathname = usePathname(); 

  useEffect(() => {
    if (user) {
      router.push(`/${pathname.split("/")[1]}/profile`);
    }
  }, [user, router, pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await login(email, password);
      const token = data.token;
      localStorage.setItem("jwtToken", token);

      const profileData = await fetchProfile(token);
      setUser(profileData);

      router.push(`/${pathname.split("/")[1]}/profile`);
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
