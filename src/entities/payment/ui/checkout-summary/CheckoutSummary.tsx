export default function CheckoutSummary() {
  return (
    <div className="flex flex-col gap-[22px]">
      <p className="h4-bold">Summary</p>

      <div className="shadow p-4">

        <div className="flex justify-between">
          <span className="h6-bold">Payment method</span>
          <span className="h6-regular">Mastercard</span>
        </div>

        <div className="w-full border-b border-light-silver mt-3 mb-2.5"></div>

        <div className="flex justify-between">
          <span className="h6-bold">Service Fee</span>
          <span className="h6-regular">$1.50</span>
        </div>

        <div className="w-full border-b border-light-silver mt-3 mb-2.5"></div>

        <div className="flex justify-between">
          <span className="h5-bold">Total cost</span>
          <span className="h6-bold">$11.95</span>
        </div>

        <div className="w-full border-b border-light-silver mt-3"></div>
      </div>
    </div>
  )
}