"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { authWithTelegram, getErrorMessage, getMe } from "@/api/client";
import { getWebApp } from "@/lib/telegram";
import { usePathname, useRouter } from "@/navigation";
import useUserStore from "@/store/store";
import BottomNav from "./BottomNav";
import Spinner from "./Spinner";

type Status = "loading" | "ready" | "no-telegram" | "error";

/** Outside Telegram a JWT can be passed as ?devToken=... in development builds. */
function getDevToken(): string | null {
  if (process.env.NODE_ENV !== "development") return null;
  return new URLSearchParams(window.location.search).get("devToken");
}

export default function TelegramProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("App");
  const router = useRouter();
  const pathname = usePathname();
  const { user, setSession, setToken, setUser } = useUserStore();
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState("");

  const signIn = useCallback(async () => {
    setStatus("loading");
    const webApp = getWebApp();
    webApp?.ready();
    webApp?.expand();

    try {
      if (webApp?.initData) {
        const { token, user } = await authWithTelegram(webApp.initData);
        setSession(token, user);
      } else {
        const devToken = getDevToken();
        if (!devToken) {
          setStatus("no-telegram");
          return;
        }
        setToken(devToken);
        setUser(await getMe());
      }
      setStatus("ready");
    } catch (err) {
      setError(getErrorMessage(err));
      setStatus("error");
    }
  }, [setSession, setToken, setUser]);

  useEffect(() => {
    signIn();
  }, [signIn]);

  useEffect(() => {
    if (status === "ready" && user && !user.isComplete && pathname !== "/profile") {
      router.replace("/profile");
    }
  }, [status, user, pathname, router]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner label={t("loading")} />
      </div>
    );
  }

  if (status === "no-telegram" || status === "error") {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3 px-8 text-center">
        <span className="text-5xl">💘</span>
        <h1 className="text-xl font-semibold">
          {status === "error" ? t("authError") : t("openInTelegram")}
        </h1>
        <p className="text-app-hint">
          {status === "error" ? error : t("openInTelegramHint")}
        </p>
        {status === "error" && (
          <button
            onClick={signIn}
            className="mt-2 rounded-xl bg-app-button px-6 py-3 font-medium text-app-button-text"
          >
            {t("retry")}
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <main className="mx-auto min-h-screen max-w-md pb-20">{children}</main>
      <BottomNav />
    </>
  );
}
