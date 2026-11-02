/** Subset of https://core.telegram.org/bots/webapps#initializing-mini-apps used by the app. */
export type TelegramWebApp = {
  initData: string;
  colorScheme: "light" | "dark";
  ready: () => void;
  expand: () => void;
  openTelegramLink: (url: string) => void;
  HapticFeedback?: {
    impactOccurred: (style: "light" | "medium" | "heavy") => void;
    notificationOccurred: (type: "success" | "warning" | "error") => void;
  };
};

declare global {
  interface Window {
    Telegram?: { WebApp?: TelegramWebApp };
  }
}

export function getWebApp(): TelegramWebApp | null {
  if (typeof window === "undefined") return null;
  return window.Telegram?.WebApp ?? null;
}

export function haptic(style: "light" | "medium" | "heavy" = "light") {
  getWebApp()?.HapticFeedback?.impactOccurred(style);
}

export function openTelegramChat(username: string) {
  const url = `https://t.me/${username}`;
  const webApp = getWebApp();
  if (webApp?.initData) {
    webApp.openTelegramLink(url);
  } else {
    window.open(url, "_blank");
  }
}
