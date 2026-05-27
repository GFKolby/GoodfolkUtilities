import CategoryPage from "@/components/CategoryPage";
import { categories, homeTools } from "@/lib/tools";

const category = categories.find((item) => item.slug === "home");

export default function HomeUtilitiesPage() {
  return (
    <CategoryPage
      title={category?.title ?? "Home Utilities"}
      description={
        category?.description ??
        "Free home utilities for planning projects, costs, and everyday home tasks."
      }
      tools={homeTools}
    />
  );
}