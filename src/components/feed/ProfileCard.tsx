"use client";

import { useState } from "react";
import { FaEllipsisH, FaMapMarkerAlt } from "react-icons/fa";
import type { PublicProfile } from "@/types";

type Props = {
  profile: PublicProfile;
  onReport: () => void;
};

export default function ProfileCard({ profile, onReport }: Props) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const photos = profile.photos;
  const photo = photos[photoIndex];

  const showPhoto = (direction: -1 | 1) => {
    setPhotoIndex((index) =>
      Math.min(Math.max(index + direction, 0), photos.length - 1),
    );
  };

  return (
    <div className="overflow-hidden rounded-3xl bg-app-secondary shadow-lg">
      <div className="relative aspect-[3/4] w-full select-none">
        {photo && (
          <img
            src={photo.url}
            alt={profile.firstName ?? ""}
            className="h-full w-full object-cover"
            draggable={false}
          />
        )}

        <button
          aria-label="previous photo"
          className="absolute inset-y-0 left-0 w-1/2"
          onClick={() => showPhoto(-1)}
        />
        <button
          aria-label="next photo"
          className="absolute inset-y-0 right-0 w-1/2"
          onClick={() => showPhoto(1)}
        />

        {photos.length > 1 && (
          <div className="absolute inset-x-3 top-3 flex gap-1">
            {photos.map((p, index) => (
              <span
                key={p.id}
                className={`h-1 flex-1 rounded-full ${
                  index === photoIndex ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}

        <button
          onClick={onReport}
          aria-label="report"
          className="absolute right-3 top-6 rounded-full bg-black/30 p-2 text-white"
        >
          <FaEllipsisH />
        </button>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-16 text-white">
          <h2 className="text-2xl font-bold">
            {profile.firstName}
            {profile.age !== null && (
              <span className="font-normal">, {profile.age}</span>
            )}
          </h2>
          {profile.city && (
            <p className="mt-1 flex items-center gap-1 text-sm opacity-90">
              <FaMapMarkerAlt /> {profile.city}
            </p>
          )}
        </div>
      </div>

      {profile.bio && (
        <p className="whitespace-pre-line p-4 text-[15px]">{profile.bio}</p>
      )}
    </div>
  );
}
