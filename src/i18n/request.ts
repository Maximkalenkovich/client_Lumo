import { getRequestConfig } from "next-intl/server";
import { locales } from "../config";

type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = locales.includes(requested as Locale)
    ? (requested as Locale)
    : "ru";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
