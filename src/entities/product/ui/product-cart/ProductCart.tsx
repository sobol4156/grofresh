import Counter from "@/shared/ui/Counter";
import Image from "next/image";
import { IProduct } from "../../model/types";
import { useCartQuantity } from "@/shared/hooks/useCartQuantity";

interface ProductCartProps {
  product: IProduct
}

export default function ProductCart({ product }: ProductCartProps) {
  const { handleQuantityChange } = useCartQuantity();

  return (
    <div className="flex gap-2.5 p-4 rounded-[30px]" style={{ boxShadow: '-1px -5px 61px rgba(139, 138, 138, 0.12)' }}>
      <div className="bg-flash-white rounded-[20px] w-fit p-4">
        <Image
          src={product.src}
          width={100}
          height={100}
          alt="Product" />
      </div>

      <div className="flex flex-col w-full justify-between">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2.5">
            <p className="h5-bold">{product.name}</p>
            <span className="medium-regular">{product.unit} {product.unitValue}</span>
          </div>

          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.0002 6L6.00015 18" stroke="black" strokeWidth="1.48571" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.00015 6L18.0002 18" stroke="black" strokeWidth="1.48571" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

        </div>

        <div className="flex justify-between items-center">
          <span className="h5-bold">${product.price}</span>

          <Counter quantity={product.quantity} btnSize="small" handleChange={(type) => handleQuantityChange(product, type)} />
        </div>
      </div>
    </div>
  )
}