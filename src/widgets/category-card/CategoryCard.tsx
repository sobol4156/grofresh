import Image from "next/image";

export default function CategoryCard() {
  return (
    <div className="bg-white p-4 rounded-[30px] flex flex-col gap-2.5">
      <Image
        src="/images/categories/vegetables.png"
        width={65}
        height={65}
        className="rounded-full" alt="category" />
      <p className="xtra-small-bold text-center">Vegetables</p>
    </div>
  )
}