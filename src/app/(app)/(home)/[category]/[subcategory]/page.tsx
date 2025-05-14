interface SubCategoryPageProps {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

export default async function SubCategoryPage({
  params,
}: SubCategoryPageProps) {
  const { category, subcategory } = await params;
  return (
    <div>
      Category Page {category} Subcategory {subcategory}
    </div>
  );
}
