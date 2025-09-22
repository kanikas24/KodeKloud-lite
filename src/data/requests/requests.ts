// src/request.ts
import { CourseDisplay } from "@/src/state/coursesSlice";
import axios from "axios";
import { modelListData } from "../models/course-list-model";

export type CourseDetails = {
  id: string;
  title: string;
  author: string;
  thumbnail: string;
  description: string;
  plan: string;
  popularity: number;
  difficultyLevel: string;
  updated_at: Date;
  lessons_count: number;
  modules: [];
};

export type CourseList = {
  items: CourseDisplay[];
  next: number;
};

const baseURL = "https://learn-api.kodekloud.com/api";

const api = axios.create({
  baseURL: "https://learn-api.kodekloud.com/api",
  headers: {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    origin: "https://learn.kodekloud.com",
    referer: "https://learn.kodekloud.com/courses",
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
  },
});

export async function getCoursesList(page: number = 1): Promise<CourseList> {
  console.log("ghecourselist", page);
  const { list, next } = modelListData(
    await api.get(`/courses`, { params: { page } })
  );

  return { items: list, next: next };
}

export async function getCourseDetails(
  keyword: string
): Promise<CourseDetails> {
  const response = await api.get(`/courses/${keyword}`);
  const data = response?.data || {};
  console.log("sjjs", data);

  return {
    id: String(data?.id),
    title: data?.title,
    author: data?.tutor?.name ?? "KodeKloud",
    thumbnail: data?.thumbnail_url ?? "",
    description: data?.description ?? "",
    plan: data?.plan ?? "",
    popularity: Number(data?.popularity ?? 0),
    difficultyLevel: data?.difficulty_level ?? "",
    updated_at: new Date(data?.updated_at ?? Date.now()),
    lessons_count: Number(data?.lessons_count ?? data?.lessons?.length ?? 0),
    modules: Array.isArray(data?.modules) ? data?.modules : [],
  };
}
