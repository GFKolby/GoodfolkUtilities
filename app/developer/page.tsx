import CategoryPage from "@/components/CategoryPage";
import { categories, developerTools } from "@/lib/tools";

const category = categories.find((item) => item.slug === "developer");

export default function DeveloperUtilitiesPage() {
  return (
    <CategoryPage
      title={category?.title ?? "Developer Utilities"}
      description={
        category?.description ??
        "Free developer tools for colors, JSON, encoding, timestamps, IDs, CSS, regex, and everyday coding tasks."
      }
      tools={developerTools}
    />
  );
}