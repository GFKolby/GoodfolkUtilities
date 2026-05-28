import CategoryPage from "@/components/CategoryPage";
import { categories, designTools } from "@/lib/tools";

const category = categories.find((item) => item.slug === "design");

export default function DesignUtilitiesPage() {
  return (
    <CategoryPage
      title={category?.title ?? "Design Utilities"}
      description={
        category?.description ??
        "Free design tools for colors, contrast, gradients, shadows, spacing, typography, and UI layout."
      }
      tools={designTools}
    />
  );
}