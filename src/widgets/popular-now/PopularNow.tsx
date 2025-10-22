import { Product } from "@/entities/product"
import { MOCK_PRODUCTS } from "@/entities/product/config/mock"

export default function PopularNow() {
  return (
    <div className="mt-[12px]">
      <div className="container">
        <div className="flex justify-between ">
          <h4 className="h4-bold">Popular now</h4>
          <button className="small-regular">more</button>
        </div>
        <div className="flex flex-wrap justify-center gap-2.5 mt-[22px]">
          {MOCK_PRODUCTS.map((product) => {
            return <Product key={product.id} product={product} />
          })}
        </div>
      </div>
    </div>
  )
}