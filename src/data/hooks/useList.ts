import {
  reset,
  selectCourse,
  selectCourseError,
  selectDisplayLoading,
  selectNextPage,
  setError,
  setLoading,
  setPage,
} from "@/src/state/coursesSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoursesList } from "../requests/requests";

export default function useList(autoLoad: boolean = true) {
  const dispatch = useDispatch();
  const items = useSelector(selectCourse);
  const next = useSelector(selectNextPage);
  const loading = useSelector(selectDisplayLoading);
  const error = useSelector(selectCourseError);

  const pageLoad = async (page: number, append: boolean) => {
    try {
      dispatch(setLoading(true));
      const { items, next } = await getCoursesList(page);
      dispatch(setPage({ items, next, append }));
      dispatch(setLoading(false));
    } catch (e: any) {
      dispatch(setError(e.message));
      dispatch(setLoading(false));
    }
  };

  const firstLoad = () => {
    dispatch(reset());
    return pageLoad(1, false);
  };

  const loadMore = () => {
    if (next && !loading) {
      return pageLoad(next, true);
    }
  };

  useEffect(() => {
    if (autoLoad && items?.length === 0 && !loading) {
      dispatch(reset());
      firstLoad();
    }
  }, [autoLoad]);

  return {
    items,
    loading,
    error,
    next,
    hasMore: Boolean(next),
    firstLoad,
    loadMore,
  };
}
