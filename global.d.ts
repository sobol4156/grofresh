declare module "*.css";

export {};

declare global {
  interface TelegramWebAppUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
    language_code?: string;
    allows_write_to_pm?: boolean;
  }

  interface TelegramWebApp {
    initData: string;
    initDataUnsafe: {
      user?: TelegramWebAppUser;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      chat?: any;
      start_param?: string;
      auth_date?: string;
      hash?: string;
    };
    close(): void;
    ready(): void;
    expand(): void;
    sendData(data: string): void;
    version: string;
    platform: string;
    colorScheme: "light" | "dark";
  }

  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}