"use client";

import { useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      const newPath = pathname.replace(/^\/(tr|en)/, `/${newLocale}`);
      router.replace(newPath);
    });
  };

  return (
    <div className="flex gap-2 p-2">
      <button
        disabled={isPending}
        onClick={() => handleLanguageChange("tr")}
        className={`px-3 py-1 text-sm font-semibold rounded transition ${
          currentLocale === "tr"
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        TR
      </button>
      <button
        disabled={isPending}
        onClick={() => handleLanguageChange("en")}
        className={`px-3 py-1 text-sm font-semibold rounded transition ${
          currentLocale === "en"
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        EN
      </button>
    </div>
  );
}