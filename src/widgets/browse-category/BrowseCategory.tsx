import CategoryCard from "../category-card";

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
      <div className="mx-auto flex pl-lg pr-lg max-w-(--breakpoint-md) mt-[22px] gap-2.5 overflow-scroll">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
          <CategoryCard key={index} />
        ))}
      </div>
    </div>
  )
}