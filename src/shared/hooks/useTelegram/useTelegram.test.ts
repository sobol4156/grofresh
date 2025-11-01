/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook } from "@testing-library/react";
import { useTelegram } from "@/shared/hooks/useTelegram/useTelegram";

describe("useTelegram hook", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    delete (window as any).Telegram;
  });

  it("should return null user if Telegram WebApp is not available", () => {
    const { result } = renderHook(() => useTelegram());
    expect(result.current.user).toBeNull();
  });

  it("should set user when Telegram WebApp user data is available", () => {
    const mockUser = {
      first_name: "John",
      last_name: "Doe",
      photo_url: "https://t.me/johndoe/photo.jpg",
    };

    const readyMock = jest.fn();

    (window as any).Telegram = {
      WebApp: {
        initDataUnsafe: { user: mockUser },
        ready: readyMock,
      },
    };

    const { result } = renderHook(() => useTelegram());

    expect(readyMock).toHaveBeenCalled();
    expect(result.current.user).toEqual({
      name: "John Doe",
      photo_url: "https://t.me/johndoe/photo.jpg",
    });
  });

  it("should handle missing last_name gracefully", () => {
    const mockUser = {
      first_name: "Alice",
      photo_url: "https://t.me/alice/photo.jpg",
    };

    (window as any).Telegram = {
      WebApp: {
        initDataUnsafe: { user: mockUser },
        ready: jest.fn(),
      },
    };

    const { result } = renderHook(() => useTelegram());
    expect(result.current.user?.name).toBe("Alice");
  });

    it("should handle when tg.initDataUnsafe itself is undefined", () => {
    (window as any).Telegram = {
      WebApp: {
        ready: jest.fn(),
      },
    };

    const { result } = renderHook(() => useTelegram());
    expect(result.current.user).toBeNull();
    expect(window.Telegram?.WebApp.ready).toHaveBeenCalled();
  });
});

