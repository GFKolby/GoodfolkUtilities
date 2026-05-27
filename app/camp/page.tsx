import CategoryPage from "@/components/CategoryPage";
import { campTools, categories } from "@/lib/tools";

const category = categories.find((item) => item.slug === "camp");

export default function CampUtilitiesPage() {
  return (
    <CategoryPage
      title={category?.title ?? "Camp Utilities"}
      description={
        category?.description ??
        "Free camping tools for packing, water planning, gear weight, and trip prep."
      }
      tools={campTools}
    />
  );
}