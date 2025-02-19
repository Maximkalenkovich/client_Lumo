"use client";
import { logout } from "@/api/auth";
import useUserStore from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHome, FaUser, FaSearch, FaCog, FaSignOutAlt } from "react-icons/fa";

export default function Footer() {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        {user && (
          <div className="flex justify-around items-center py-3">
            {/* Иконка 1: Главная */}
            <Link
              href="/"
              className="flex flex-col items-center text-gray-700 hover:text-blue-500"
            >
              <FaHome className="text-2xl" />
              <span className="text-xs mt-1">Главная</span>
            </Link>

            {/* Иконка 2: Поиск */}
            <Link
              href="/search"
              className="flex flex-col items-center text-gray-700 hover:text-blue-500"
            >
              <FaSearch className="text-2xl" />
              <span className="text-xs mt-1">Поиск</span>
            </Link>

            {/* Иконка 3: Профиль */}
            <Link
              href="/profile"
              className="flex flex-col items-center text-gray-700 hover:text-blue-500"
            >
              <FaUser className="text-2xl" />
              <span className="text-xs mt-1">Профиль</span>
            </Link>

            <p
              className="flex flex-col items-center text-gray-700 hover:text-blue-500"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="mr-2" />

              <span className="text-xs mt-1">выйти</span>
            </p>
            <></>
          </div>
        )}
      </div>
    </footer>
  );
}
