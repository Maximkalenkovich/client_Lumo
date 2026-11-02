"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getErrorMessage, getMatches } from "@/api/client";
import Spinner from "@/components/Spinner";
import { openTelegramChat } from "@/lib/telegram";
import type { Match } from "@/types";

export default function MatchesPage() {
  const t = useTranslations("Matches");
  const tApp = useTranslations("App");
  const [matches, setMatches] = useState<Match[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getMatches()
      .then(setMatches)
      .catch((err) => setError(getErrorMessage(err)));
  }, []);

  return (
    <div className="px-4 pt-4">
      <h1 className="mb-4 text-xl font-bold">{t("title")}</h1>

      {error && <p className="text-sm text-app-destructive">{error}</p>}

      {!matches && !error && (
        <div className="flex justify-center pt-20">
          <Spinner label={tApp("loading")} />
        </div>
      )}

      {matches?.length === 0 && (
        <div className="flex flex-col items-center gap-2 pt-20 text-center">
          <span className="text-5xl">💌</span>
          <h2 className="text-lg font-semibold">{t("empty")}</h2>
          <p className="text-app-hint">{t("emptyHint")}</p>
        </div>
      )}

      <ul className="flex flex-col gap-2">
        {matches?.map(({ id, user }) => (
          <li
            key={id}
            className="flex items-center gap-3 rounded-2xl bg-app-secondary p-3"
          >
            {user.photos[0] ? (
              <img
                src={user.photos[0].url}
                alt={user.firstName ?? ""}
                className="h-14 w-14 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="h-14 w-14 shrink-0 rounded-full bg-app-bg" />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">
                {user.firstName}
                {user.age !== null && `, ${user.age}`}
              </p>
              {user.tgUsername ? (
                user.city && (
                  <p className="truncate text-sm text-app-hint">{user.city}</p>
                )
              ) : (
                <p className="text-xs text-app-hint">{t("noUsername")}</p>
              )}
            </div>
            {user.tgUsername && (
              <button
                onClick={() => openTelegramChat(user.tgUsername!)}
                className="shrink-0 rounded-xl bg-app-button px-4 py-2 text-sm font-medium text-app-button-text"
              >
                {t("write")}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
