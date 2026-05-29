import CategoryPage from "@/components/CategoryPage";
import { categories, healthTools } from "@/lib/tools";

const category = categories.find((item) => item.slug === "health");

export default function HealthUtilitiesPage() {
  return (
    <CategoryPage
      title={category?.title ?? "Health Utilities"}
      description={
        category?.description ??
        "Free health tools for BMI, calories, water intake, protein, walking, macros, sleep, heart rate zones, and weight planning."
      }
      tools={healthTools}
    />
  );
}