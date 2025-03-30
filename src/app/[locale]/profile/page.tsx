"use client";

import GenderSwitcher from "@/components/common/GenderSwitcher";
import useUserStore from "@/store/store";
import { Link, routes } from "@/navigation";
import { useTranslations } from "use-intl";

export default function ProfilePage() {
  const user = useUserStore((state) => state.user);
  const t = useTranslations("Profile");

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="mb-4">
          <p className="">
            {t("title")}: {user?.email}
          </p>
          <p className="text-sm font-medium text-black-700">
            Name: {user?.username}
          </p>
          <GenderSwitcher />
          <Link  href={routes.photos(String(user.id))}
            className="text-blue-500 hover:underline"
          >
            Фото
          </Link>
        </div>
      </div>
    </div>
  );
}
