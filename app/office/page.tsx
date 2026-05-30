import CategoryPage from "@/components/CategoryPage";
import { categories, officeTools } from "@/lib/tools";

const category = categories.find((item) => item.slug === "office");

export default function OfficeUtilitiesPage() {
  return (
    <CategoryPage
      title={category?.title ?? "Office Utilities"}
      description={
        category?.description ??
        "Free tools for work, data cleanup, documents, and daily operations."
      }
      intro={category?.intro}
      tools={officeTools}
    />
  );
}