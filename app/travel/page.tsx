import CategoryPage from "@/components/CategoryPage";
import { categories, travelTools } from "@/lib/tools";

const category = categories.find((item) => item.slug === "travel");

export default function TravelUtilitiesPage() {
  return (
    <CategoryPage
      title={category?.title ?? "Travel Utilities"}
      description={
        category?.description ??
        "Free travel tools for trip budgets, packing, hotels, gas, layovers, attractions, and travel planning."
      }
      intro={category?.intro}
      tools={travelTools}
    />
  );
}