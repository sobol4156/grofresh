/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutDetails from "./CheckoutDetails";
import * as hooks from "@/app/providers/store-provider/config/hooks";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/app/providers/store-provider/config/hooks", () => ({
  useAppSelector: jest.fn(),
}));

jest.mock("@/shared/ui/ActionOfferCard", () => ({ type, text, onClick }: any) => (
  <div data-testid={`action-${type}`} onClick={onClick}>
    {text}
  </div>
));

jest.mock("@/shared/ui/PaymentCard", () => ({ card, isLastCard }: any) => (
  <div data-testid="payment-card">
    PaymentCard - {card ? card.name : "no card"} {isLastCard && "(last)"}
  </div>
));

jest.mock("@/entities/payment/ui/checkout-summary", () => () => (
  <div data-testid="checkout-summary">CheckoutSummary</div>
));

describe("CheckoutDetails component", () => {
  const mockUseAppSelector = hooks.useAppSelector as jest.Mock;
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("renders all main sections", () => {
    mockUseAppSelector.mockReturnValue({ id: 1, name: "Visa" });

    render(<CheckoutDetails />);

    expect(screen.getByText("Use discount code here")).toBeInTheDocument();
    expect(screen.getByText("Set the payment method")).toBeInTheDocument();
    expect(screen.getByTestId("payment-card")).toHaveTextContent("Visa");
    expect(screen.getByTestId("checkout-summary")).toBeInTheDocument();
    expect(screen.getByText("Last use")).toBeInTheDocument();
  });

  it("calls router.push when 'Set the payment method' clicked", () => {
    mockUseAppSelector.mockReturnValue(null);

    render(<CheckoutDetails />);

    fireEvent.click(screen.getByText("Set the payment method"));
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("renders PaymentCard with 'no card' when lastCard is null", () => {
    mockUseAppSelector.mockReturnValue(null);

    render(<CheckoutDetails />);

    expect(screen.getByTestId("payment-card")).toHaveTextContent("no card");
  });
});
