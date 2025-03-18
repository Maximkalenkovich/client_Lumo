import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

import { localePrefix, locales, pathnames } from "./config";
import { AppPathname } from "./configs/localization.config";

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
    localePrefix,
  });


  type Params<T = undefined> = T extends undefined
  ? {}
  : {
      params: T;
    };
const pathnameAliases = [
  'home',
  'profile',
  'search',
] as const;


const paths: Record<(typeof pathnameAliases)[number], AppPathname> = {
  home: '/',
  profile: '/profile',
  search: '/search',
} as const;

export const routes = {


  home: function () {
    return {
      pathname: paths.home,
    };
  },

    profile: function () {
    return {
      pathname: paths.profile,
    };
  },
};
