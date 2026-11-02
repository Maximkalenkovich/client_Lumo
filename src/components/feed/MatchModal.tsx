"use client";

import { useTranslations } from "next-intl";
import { openTelegramChat } from "@/lib/telegram";
import type { Match } from "@/types";

type Props = {
  match: Match;
  onClose: () => void;
};

export default function MatchModal({ match, onClose }: Props) {
  const t = useTranslations("Feed");
  const { user } = match;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 p-6">
      <div className="w-full max-w-sm rounded-3xl bg-app-bg p-6 text-center">
        <p className="text-4xl">💘</p>
        <h2 className="mt-2 text-2xl font-bold">{t("matchTitle")}</h2>
        {user.photos[0] && (
          <img
            src={user.photos[0].url}
            alt={user.firstName ?? ""}
            className="mx-auto mt-4 h-28 w-28 rounded-full object-cover"
          />
        )}
        <p className="mt-3 text-app-hint">
          {t("matchText", { name: user.firstName ?? "" })}
        </p>
        {user.tgUsername && (
          <button
            onClick={() => openTelegramChat(user.tgUsername!)}
            className="mt-5 w-full rounded-xl bg-app-button py-3 font-medium text-app-button-text"
          >
            {t("write")}
          </button>
        )}
        <button onClick={onClose} className="mt-3 w-full py-2 text-app-link">
          {t("later")}
        </button>
      </div>
    </div>
  );
}
