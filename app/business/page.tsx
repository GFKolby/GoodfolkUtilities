import CategoryPage from "@/components/CategoryPage";
import { businessTools, categories } from "@/lib/tools";

const category = categories.find((item) => item.slug === "business");

export default function BusinessUtilitiesPage() {
  return (
    <CategoryPage
      title={category?.title ?? "Business Utilities"}
      description={
        category?.description ??
        "Free business tools for profit margins, pricing, invoices, break-even planning, meetings, and startup costs."
      }
      tools={businessTools}
    />
  );
}