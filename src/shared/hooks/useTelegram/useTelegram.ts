'use client'
import { useEffect, useState } from "react";

export function useTelegram() {
  const [user, setUser] = useState<{ name: string; photo_url?: string } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const tg = window.Telegram?.WebApp;

    if (!tg) {
      console.warn("Telegram WebApp is not available");
      return;
    }

    tg.ready();

    const u = tg.initDataUnsafe?.user;
    if (u) {
      setUser({
        name: `${u.first_name} ${u.last_name ?? ""}`.trim(),
        photo_url: u.photo_url,
      });
    }
  }, []);

  return { user };
}
