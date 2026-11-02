"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { getErrorMessage, updateMe, type ProfileUpdate } from "@/api/client";
import PhotoGrid from "@/components/profile/PhotoGrid";
import { useRouter } from "@/navigation";
import useUserStore from "@/store/store";
import type { Gender, LookingFor, MyProfile } from "@/types";

type Form = {
  firstName: string;
  gender: Gender | "";
  lookingFor: LookingFor | "";
  dateOfBirth: string;
  city: string;
  bio: string;
};

function toForm(user: MyProfile): Form {
  return {
    firstName: user.firstName ?? "",
    gender: user.gender ?? "",
    lookingFor: user.lookingFor ?? "",
    dateOfBirth: user.dateOfBirth?.slice(0, 10) ?? "",
    city: user.city ?? "",
    bio: user.bio ?? "",
  };
}

const inputClass =
  "w-full rounded-xl bg-app-secondary px-4 py-3 outline-none focus:ring-2 focus:ring-app-button";

function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T | "";
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex gap-1 rounded-xl bg-app-secondary p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`flex-1 rounded-lg py-2 text-sm ${
            value === option.value
              ? "bg-app-button font-medium text-app-button-text"
              : "text-app-text"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default function ProfilePage() {
  const t = useTranslations("Profile");
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [form, setForm] = useState<Form | null>(user ? toForm(user) : null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; error: boolean }>();

  if (!user || !form) return null;

  const set = <K extends keyof Form>(key: K, value: Form[K]) =>
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(undefined);

    const data: ProfileUpdate = {
      firstName: form.firstName,
      city: form.city,
      bio: form.bio,
      ...(form.gender && { gender: form.gender }),
      ...(form.lookingFor && { lookingFor: form.lookingFor }),
      ...(form.dateOfBirth && { dateOfBirth: form.dateOfBirth }),
    };

    try {
      const wasComplete = user.isComplete;
      const updated = await updateMe(data);
      setUser(updated);
      setForm(toForm(updated));
      setMessage({ text: t("saved"), error: false });
      if (!wasComplete && updated.isComplete) router.push("/");
    } catch (err) {
      setMessage({ text: getErrorMessage(err), error: true });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-4 pt-4">
      <h1 className="text-xl font-bold">{t("title")}</h1>

      {!user.isComplete && (
        <p className="rounded-xl bg-app-button/15 p-3 text-sm">
          {t("incomplete")}
        </p>
      )}

      <section>
        <h2 className="mb-1 font-semibold">{t("photos")}</h2>
        <p className="mb-2 text-xs text-app-hint">{t("photosHint")}</p>
        <PhotoGrid
          onError={(text) => setMessage(text ? { text, error: true } : undefined)}
        />
      </section>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-app-hint">{t("name")}</span>
        <input
          className={inputClass}
          value={form.firstName}
          maxLength={40}
          onChange={(e) => set("firstName", e.target.value)}
          required
        />
      </label>

      <div className="flex flex-col gap-1">
        <span className="text-sm text-app-hint">{t("gender")}</span>
        <Segmented
          value={form.gender}
          onChange={(value) => set("gender", value)}
          options={[
            { value: "male", label: t("male") },
            { value: "female", label: t("female") },
          ]}
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm text-app-hint">{t("lookingFor")}</span>
        <Segmented
          value={form.lookingFor}
          onChange={(value) => set("lookingFor", value)}
          options={[
            { value: "female", label: t("lookingFemale") },
            { value: "male", label: t("lookingMale") },
            { value: "any", label: t("lookingAny") },
          ]}
        />
      </div>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-app-hint">{t("birthDate")}</span>
        <input
          type="date"
          className={inputClass}
          value={form.dateOfBirth}
          onChange={(e) => set("dateOfBirth", e.target.value)}
          required
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-app-hint">{t("city")}</span>
        <input
          className={inputClass}
          value={form.city}
          maxLength={60}
          onChange={(e) => set("city", e.target.value)}
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-app-hint">{t("bio")}</span>
        <textarea
          className={`${inputClass} min-h-24 resize-none`}
          value={form.bio}
          maxLength={500}
          placeholder={t("bioPlaceholder")}
          onChange={(e) => set("bio", e.target.value)}
        />
      </label>

      {message && (
        <p
          className={`text-sm ${
            message.error ? "text-app-destructive" : "text-app-link"
          }`}
        >
          {message.text}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="mb-4 rounded-xl bg-app-button py-3 font-medium text-app-button-text disabled:opacity-60"
      >
        {saving ? t("saving") : t("save")}
      </button>
    </form>
  );
}
