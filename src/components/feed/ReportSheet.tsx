"use client";

import { useTranslations } from "next-intl";
import { REPORT_REASONS, type ReportReason } from "@/types";

type Props = {
  onSelect: (reason: ReportReason) => void;
  onClose: () => void;
};

export default function ReportSheet({ onSelect, onClose }: Props) {
  const t = useTranslations("Report");

  return (
    <div
      className="fixed inset-0 z-30 flex items-end bg-black/50"
      onClick={onClose}
    >
      <div
        className="mx-auto w-full max-w-md rounded-t-3xl bg-app-bg p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-2 text-center font-semibold">{t("title")}</h3>
        {REPORT_REASONS.map((reason) => (
          <button
            key={reason}
            onClick={() => onSelect(reason)}
            className="w-full border-b border-app-secondary py-3 text-left"
          >
            {t(reason)}
          </button>
        ))}
        <button
          onClick={onClose}
          className="mt-2 w-full py-3 font-medium text-app-destructive"
        >
          {t("cancel")}
        </button>
      </div>
    </div>
  );
}
