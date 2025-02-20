"use client";

import { useEffect, useState } from "react";
import useUserStore from "@/store/store";
import { fetchProfile } from "@/api/auth";
import { usePathname, useRouter } from "next/navigation";

export default function AuthChecker({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname(); // Получаем текущий путь с локалью
  const { user, setUser, clearUser } = useUserStore();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      clearUser();
      router.replace(`/${pathname.split("/")[1]}/login`); // Добавляем локаль в путь
      return;
    }

    if (!user) {
      const fetchProfile = async () => {
        try {
          const response = await fetch(
            "http://localhost:3009/api/auth/profile",
            {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (!response.ok) throw new Error("Failed to fetch profile");

          const profileData = await response.json();
          setUser(profileData);
        } catch (err) {
          console.error("Error fetching profile:", err);
          localStorage.removeItem("jwtToken");
          clearUser();
          router.replace(`/${pathname.split("/")[1]}/login`); // Используем локализованный путь
        }
      };

      fetchProfile();
    }
  }, [router, user, setUser, clearUser]);

  return <>{children}</>;
}
