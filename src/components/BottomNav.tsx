"use client";

import { useTranslations } from "next-intl";
import { FaFire, FaHeart, FaUser } from "react-icons/fa";
import { Link, usePathname } from "@/navigation";
import useUserStore from "@/store/store";

const ITEMS = [
  { href: "/", key: "feed", Icon: FaFire },
  { href: "/matches", key: "matches", Icon: FaHeart },
  { href: "/profile", key: "profile", Icon: FaUser },
] as const;

export default function BottomNav() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const isComplete = useUserStore((state) => state.user?.isComplete);

  return (
    <nav className="fixed bottom-0 left-0 z-20 w-full border-t border-app-secondary bg-app-bg pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-md justify-around py-2">
        {ITEMS.map(({ href, key, Icon }) => {
          const active = pathname === href;
          const disabled = !isComplete && href !== "/profile";
          return (
            <Link
              key={href}
              href={href}
              aria-disabled={disabled}
              className={`flex flex-col items-center gap-1 px-4 py-1 text-xs ${
                active ? "text-app-button" : "text-app-hint"
              } ${disabled ? "pointer-events-none opacity-40" : ""}`}
            >
              <Icon className="text-xl" />
              {t(key)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
