import SearchRecently from "@/features/search-recently";
import BrowseCategory from "@/widgets/browse-category";
import DiscountCard from "@/widgets/discount-card";
import PopularNow from "@/widgets/popular-now";

export default function Home() {
  return (
    <div className="mt-[22px]">
      <div className="w-full">
        <div className="container">
          <SearchRecently />
          <DiscountCard className="mt-[22px]"/>

        </div>
        <BrowseCategory className="mt-[22px] overflow-hidden" />
        <PopularNow />
      </div>
    </div>
  );
}
