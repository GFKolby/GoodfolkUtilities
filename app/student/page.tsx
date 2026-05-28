import CategoryPage from "@/components/CategoryPage";
import { categories, studentTools } from "@/lib/tools";

const category = categories.find((item) => item.slug === "student");

export default function StudentUtilitiesPage() {
  return (
    <CategoryPage
      title={category?.title ?? "Student Utilities"}
      description={
        category?.description ??
        "Free student tools for grades, GPA, study planning, assignments, writing, and semester workload."
      }
      tools={studentTools}
    />
  );
}