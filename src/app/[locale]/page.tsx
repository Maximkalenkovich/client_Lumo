"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { FaHeart, FaTimes } from "react-icons/fa";
import { getErrorMessage, getFeed, reportUser, swipe } from "@/api/client";
import MatchModal from "@/components/feed/MatchModal";
import ProfileCard from "@/components/feed/ProfileCard";
import ReportSheet from "@/components/feed/ReportSheet";
import Spinner from "@/components/Spinner";
import { haptic } from "@/lib/telegram";
import useUserStore from "@/store/store";
import type { Match, PublicProfile, ReportReason } from "@/types";

export default function FeedPage() {
  const t = useTranslations("Feed");
  const tApp = useTranslations("App");
  const isComplete = useUserStore((state) => state.user?.isComplete);
  const [profiles, setProfiles] = useState<PublicProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [match, setMatch] = useState<Match | null>(null);
  const [reporting, setReporting] = useState(false);

  const loadFeed = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setProfiles(await getFeed());
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isComplete) loadFeed();
  }, [isComplete, loadFeed]);

  const current = profiles[0];

  /** Removes the current card immediately; the feed is reloaded only after the server saved the action. */
  const act = async (request: () => Promise<void>) => {
    const rest = profiles.slice(1);
    setProfiles(rest);
    try {
      await request();
    } catch (err) {
      setError(getErrorMessage(err));
    }
    if (rest.length === 0) loadFeed();
  };

  const handleSwipe = (liked: boolean) => {
    if (!current) return;
    haptic(liked ? "medium" : "light");
    act(async () => {
      const result = await swipe(current.id, liked);
      if (result.matched && result.match) setMatch(result.match);
    });
  };

  const handleReport = (reason: ReportReason) => {
    if (!current) return;
    setReporting(false);
    act(async () => {
      await reportUser(current.id, reason);
    });
  };

  if (!isComplete) return null;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col px-4 pt-4">
      {error && (
        <p className="mb-3 rounded-xl bg-app-secondary p-3 text-sm text-app-destructive">
          {error}
        </p>
      )}

      {loading && !current ? (
        <div className="flex flex-1 items-center justify-center">
          <Spinner label={tApp("loading")} />
        </div>
      ) : current ? (
        <>
          <ProfileCard
            key={current.id}
            profile={current}
            onReport={() => setReporting(true)}
          />
          <div className="sticky bottom-20 mt-4 flex justify-center gap-8 pb-2">
            <button
              aria-label={t("skip")}
              onClick={() => handleSwipe(false)}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-app-secondary text-2xl text-app-hint shadow-md active:scale-95"
            >
              <FaTimes />
            </button>
            <button
              aria-label={t("like")}
              onClick={() => handleSwipe(true)}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-app-button text-2xl text-app-button-text shadow-md active:scale-95"
            >
              <FaHeart />
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
          <span className="text-5xl">🌙</span>
          <h2 className="text-lg font-semibold">{t("empty")}</h2>
          <p className="text-app-hint">{t("emptyHint")}</p>
          <button
            onClick={loadFeed}
            className="mt-3 rounded-xl bg-app-button px-6 py-3 font-medium text-app-button-text"
          >
            {t("refresh")}
          </button>
        </div>
      )}

      {reporting && (
        <ReportSheet
          onSelect={handleReport}
          onClose={() => setReporting(false)}
        />
      )}
      {match && <MatchModal match={match} onClose={() => setMatch(null)} />}
    </div>
  );
}
