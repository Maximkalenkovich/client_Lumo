"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FaPlus, FaTimes } from "react-icons/fa";
import { deletePhoto, getErrorMessage, getMe, uploadPhoto } from "@/api/client";
import useUserStore from "@/store/store";

const MAX_PHOTOS = 6;

export default function PhotoGrid({
  onError,
}: {
  onError: (message: string) => void;
}) {
  const t = useTranslations("Profile");
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  if (!user) return null;

  const run = async (action: () => Promise<unknown>) => {
    setBusy(true);
    onError("");
    try {
      await action();
      setUser(await getMe());
    } catch (err) {
      onError(getErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) run(() => uploadPhoto(file));
  };

  const canAdd = user.photos.length < MAX_PHOTOS;

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {user.photos.map((photo, index) => (
          <div
            key={photo.id}
            className="relative aspect-[3/4] overflow-hidden rounded-xl bg-app-secondary"
          >
            <img src={photo.url} alt="" className="h-full w-full object-cover" />
            {index === 0 && (
              <span className="absolute bottom-1 left-1 rounded-md bg-black/50 px-1.5 text-[10px] text-white">
                ★
              </span>
            )}
            <button
              aria-label="delete photo"
              disabled={busy}
              onClick={() => run(() => deletePhoto(photo.id))}
              className="absolute right-1 top-1 rounded-full bg-black/50 p-1.5 text-xs text-white"
            >
              <FaTimes />
            </button>
          </div>
        ))}

        {canAdd && (
          <button
            disabled={busy}
            onClick={() => inputRef.current?.click()}
            className="flex aspect-[3/4] flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-app-hint/40 text-sm text-app-hint"
          >
            <FaPlus />
            {busy ? t("uploading") : t("addPhoto")}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}
