import { Pathnames } from 'next-intl/navigation';

export const locales = ['en', 'ru'] as const;
export type Locale = (typeof locales)[number];

export const pathnames = {
  '/': '/',
  '/profile': {
    en: '/profile',
    ru: '/profile',
  },
  '/search': {
    en: '/search',
    ru: '/search',
  },
  '/profile/[userId]/photos': {
    en: '/profile/[userId]/photos',
    ru: '/profile/[userId]/photos',
  }
  
} satisfies Pathnames<typeof locales>;

export const localePrefix = 'as-needed';
export const defaultLocale: Locale = 'ru';

export type AppPathname = keyof typeof pathnames;
