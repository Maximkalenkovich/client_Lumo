"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/store";
import { fetchProfile } from "@/api/auth";

export default function AuthChecker({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, setUser, clearUser } = useUserStore();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      clearUser();
      router.push("/login"); // Используем `replace`, чтобы избежать истории переходов
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
          router.push("/login");
        }
      };

      fetchProfile();
    }
  }, [router, user, setUser, clearUser]);

  return <>{children}</>;
}
