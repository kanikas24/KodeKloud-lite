import { CourseDisplay } from "@/src/state/coursesSlice";

export const modelListData = (
  response: any
): { list: CourseDisplay[]; next: number } => {
  const responseData = response?.data?.courses || {};
  const items: CourseDisplay[] = (responseData ?? []).map((c: any) => ({
    id: String(c?.id),
    slug: String(c?.slug),
    title: c?.title,
    author: c?.tutors?.[0]?.name ?? "KodeKloud",
    thumbnail: c?.thumbnail_url ?? "",
  }));
  let next: number = response?.data?.metadata?.next_page;
  return { list: items, next };
};
