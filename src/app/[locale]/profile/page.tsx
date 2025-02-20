"use client";

import GenderSwitcher from "@/components/common/GenderSwitcher";

import { Avatar } from "@/components/uploadAvatar/UploadAvatar";
import useUserStore from "@/store/store";

export default function ProfilePage() {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>

        <Avatar userId={user.id} images={user.avatars} defaultImage="" />
        <div className="mb-4">
          <p className="">Email: {user?.email}</p>
          <p className="text-sm font-medium text-black-700">
            Name: {user?.username}
          </p>
          <GenderSwitcher />
        </div>
      </div>
    </div>
  );
}
