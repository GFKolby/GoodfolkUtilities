import CategoryPage from "@/components/CategoryPage";
import { categories, financeTools } from "@/lib/tools";

const category = categories.find((item) => item.slug === "finance");

export default function FinanceUtilitiesPage() {
  return (
    <CategoryPage
      title={category?.title ?? "Finance Utilities"}
      description={
        category?.description ??
        "Free finance tools for budgeting, savings goals, debt payoff, subscriptions, and income planning."
      }
      tools={financeTools}
    />
  );
}