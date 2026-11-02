import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "../globals.css";
import TelegramProvider from "@/components/TelegramProvider";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
  title: "Lumo",
  description: "Знакомства в Telegram",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    // telegram-web-app.js sets theme CSS variables on <html> before hydration.
    <html lang={locale} suppressHydrationWarning>
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <TelegramProvider>{children}</TelegramProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
