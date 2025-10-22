import CategoryCard from "../category-card";
import { MOCK_CATEGORIES } from "./config/mock";

interface BrowseCategoryProps {
  className?: string;
}

export default function BrowseCategory({ className }: BrowseCategoryProps) {
  return (
    <div className={className}>
      <div className="flex justify-between container">
        <h4 className="h4-bold">Browse categories</h4>
        <button className="small-regular">more</button>
      </div>
      <div className="mx-auto flex pl-lg pr-lg pb-[10px] max-w-(--breakpoint-md) mt-[22px] gap-2.5 minimal-scroll">
        {MOCK_CATEGORIES.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}