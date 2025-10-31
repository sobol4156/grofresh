import { render, screen, fireEvent } from "@testing-library/react";
import CartSummary from "./CartSummary";
import * as hooks from "@/app/providers/store-provider/config/hooks";
import { allPriceCart as allPriceCartSelector } from "@/entities/cart/model/cart.slice";
import { serviceFee as serviceFeeSelector } from "@/entities/payment/model/payment.slice";

jest.mock("@/app/providers/store-provider/config/hooks", () => ({
  useAppSelector: jest.fn(),
}));

describe("CartSummary component", () => {
  const mockUseAppSelector = hooks.useAppSelector as jest.Mock;
  const mockCheckout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });
    // Корректно отображает общую цену
  it("renders total price correctly", () => {
    mockUseAppSelector.mockImplementation((selector) => {
      if (selector === allPriceCartSelector) return 100;
      if (selector === serviceFeeSelector) return 10;
    });

    render(<CartSummary isEmpty={false} onCheckout={mockCheckout} />);

    expect(screen.getByText("Total : $110")).toBeInTheDocument();
    expect(screen.getByText("Discount up to 5%")).toBeInTheDocument();
  });

  // отображает сумму как 0, если корзина пуста
  it("renders total as 0 if cart is empty", () => {
    mockUseAppSelector.mockImplementation((selector) => {
      if (selector === allPriceCartSelector) return 0;
      if (selector === serviceFeeSelector) return 10;
    });

    render(<CartSummary isEmpty={true} onCheckout={mockCheckout} />);

    expect(screen.getByText("Total : $0")).toBeInTheDocument();
  });

  // отключает кнопку, когда корзина пуста
  it("disables the button when cart is empty", () => {
    mockUseAppSelector.mockReturnValue(0);

    render(<CartSummary isEmpty={true} onCheckout={mockCheckout} />);

    const button = screen.getByRole("button", { name: /checkout now/i });
    expect(button).toBeDisabled();
  });

  // вызывает проверку при нажатии кнопки
  it("calls onCheckout when button clicked", () => {
    mockUseAppSelector.mockImplementation((selector) => {
      if (selector === allPriceCartSelector) return 200;
      if (selector === serviceFeeSelector) return 20;
    });

    render(<CartSummary isEmpty={false} onCheckout={mockCheckout} />);

    const button = screen.getByRole("button", { name: /checkout now/i });
    fireEvent.click(button);

    expect(mockCheckout).toHaveBeenCalledTimes(1);
  });
});
