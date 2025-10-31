import { useEffect, useState } from "react";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

export function useTelegram() {
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const waitForTelegram = () => {
      const tg = window.Telegram?.WebApp;
      if (!tg) {
        console.warn("Waiting for Telegram WebApp...");
        setTimeout(waitForTelegram, 1000); 
        return;
      }

      tg.ready();

      const u = tg.initDataUnsafe?.user;
      if (u) {
        setUser(u);
        console.log("Telegram user:", u);
      } else {
        console.warn("No user info in initDataUnsafe:", tg.initDataUnsafe);
      }
    };

    waitForTelegram();
  }, []);

  return { user };
}
