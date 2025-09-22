import {
  selectProgressStatus,
  setProgressForId,
} from "@/src/state/videoPlaybackSlice";
import { useDispatch, useSelector } from "react-redux";

const useVideoProgress = () => {
  const progress = useSelector(selectProgressStatus);
  const dispatch = useDispatch();

  const getCourseProgress = (keyword: string) => {
    const courseItem = progress[keyword] || {};
    let trueCount = 0;
    Object.values(courseItem).forEach((course) => {
      if (typeof course === "object" && course !== null) {
        trueCount += Object.values(course).filter(
          (value) => value === true
        ).length;
      }
    });
    return trueCount;
  };

  const getLessonCompleted = (
    keyword: string,
    module: string,
    lesson: string
  ) => {
    return progress?.[keyword]?.[module]?.[lesson];
  };

  const updateVideoComplete = (
    keyword: string,
    module: string,
    lesson: string
  ) => {
    dispatch(setProgressForId({ keyword, module, lesson, status: true }));
  };
  return { updateVideoComplete, getCourseProgress, getLessonCompleted };
};
export default useVideoProgress;
