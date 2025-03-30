import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import {
  AppPathname,
  localePrefix,
  locales,
  pathnames,
} from "./configs/localization.config";

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
const pathnameAliases = ["home", "profile", "search", "photos"] as const;

const paths: Record<(typeof pathnameAliases)[number], AppPathname> = {
  home: "/",
  profile: "/profile",
  search: "/search",
  photos: "/profile/[userId]/photos",
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
  search: function() {
    return {
      pathname: paths.search,
    };
  },
  photos: function (userId: string) {
    return {
      pathname: paths.photos,
      params: { userId },
    };
  },
};
