import CategoryPage from "@/components/CategoryPage";
import { categories, developerTools } from "@/lib/tools";

const category = categories.find((item) => item.slug === "developer");

export default function DeveloperUtilitiesPage() {
  return (
    <CategoryPage
      title={category?.title ?? "Developer Utilities"}
      description={
        category?.description ??
        "Free developer tools for JSON, URLs, Base64, timestamps, IDs, regex, JWTs, HTML entities, and API cleanup."
      }
      tools={developerTools}
    />
  );
}