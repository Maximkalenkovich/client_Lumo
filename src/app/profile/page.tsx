"use client"; // Указываем, что это клиентский компонент

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "../../store/store"; // Импортируем Zustand хранилище
import GenderSwitcher from "@/components/common/GenderSwitcher";
import Image from "next/image";

export default function ProfilePage() {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  console.log(user);
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
        <Image src={user.avatar ?? ""} alt="" width={400} height={400} />
        <div className="mb-4">
          <p className="">Email: {user?.email}</p>
          <p className="text-sm font-medium text-black-700">
            Name: {user?.username}
          </p>
          <GenderSwitcher /> {/* Добавляем компонент смены пола */}
        </div>
      </div>
    </div>
  );
}