import { Product } from "@/entities/product"

export default function PopularNow() {
  return (
    <div className="mt-[12px]">
      <div className="container">
        <div className="flex justify-between ">
          <h4 className="h4-bold">Popular now</h4>
          <button className="small-regular">more</button>
        </div>
        <div className="flex flex-wrap justify-center gap-2.5 mt-[22px]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => {
            return <Product key={index} />
          })}
        </div>
      </div>

    </div>
  )
}