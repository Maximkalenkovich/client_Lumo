"use client";

import GenderSwitcher from "@/components/common/GenderSwitcher";

import { Avatar } from "@/components/uploadAvatar/UploadAvatar";
import useUserStore from "@/store/store";
import { useTranslations } from "use-intl";


export default function ProfilePage() {
  const user = useUserStore((state) => state.user);
  const t = useTranslations("Profile")

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">{t`{}`}</h2>

        <Avatar userId={user.id} images={user.avatars} defaultImage="" />
        <div className="mb-4">
          <p className=""> {t('title')}: {user?.email}</p>
          <p className="text-sm font-medium text-black-700">
            Name: {user?.username}9h478HQWFsUAa9_
          </p>
          <GenderSwitcher />
        </div>
      </div>
    </div>
  );
}
