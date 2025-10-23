import Image from "next/image";
import type { IProduct } from "../model/types";
import { AddToCartButton } from "@/features/add-to-cart";

interface ProductProps {
  product: IProduct;
}

export default function Product({ product }: ProductProps) {
  return (
    <div className="bg-white flex-1 min-w-[150px] max-w-[180px] p-2.5 flex flex-col gap-2.5 rounded-[30px]" style={{ boxShadow: '-1px -5px 61px rgba(139, 138, 138, 0.12)' }}>
      <div className="bg-white rounded-[20px] flex justify-center" style={{ boxShadow: '-1px -5px 61px rgba(139, 138, 138, 0.12)' }}>
        <Image
          src={product.src ?? '/images/products/spinach.png'}
          width={100}
          height={100}
          alt="Product" />
      </div>
      <div>
        <div className="flex flex-col gap-[5px]">
          <h5 className="h5-bold">{product.name}</h5>
          <span className="h6-regular">{product.unitValue} {product.unit}</span>
        </div>
        <div className="flex justify-between items-center mt-[7px]">
          <b className="medium-bold">${product.price}</b>
          <AddToCartButton item={product}/>

        </div>
      </div>
    </div>
  )
}

