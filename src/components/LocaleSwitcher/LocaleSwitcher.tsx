"use client";

import { useLocale } from "next-intl";

import React from "react";
import { usePathname, useRouter } from "@/navigation";
import { useParams } from "next/navigation";
import { locales } from "@/config";

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function handleLocaleChange() {
    const nextLocale = locales.find((item) => item !== locale);
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: nextLocale }
    );
  }

  return (
    <button
      className="border-none"
      onClick={handleLocaleChange}
    >
      {locale.toUpperCase()}
    </button>
  );
};
