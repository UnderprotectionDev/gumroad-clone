import { Category } from "@/payload-types";
import { CategoryDropdown } from "./category-dropdown";

interface CategoriesProps {
  data: any;
}

export const Categories = ({ data }: CategoriesProps) => {
  return (
    <div className="relative w-full">
      <div className="flex flex-nowrap items-center">
        {data.map((category: Category) => (
          <CategoryDropdown
            key={category.id}
            category={category}
            isActive={false}
            isNavigationHovered={false}
          />
        ))}
      </div>
    </div>
  );
};
