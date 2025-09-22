import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  detailsData,
  detailsError,
  detailsLoader,
  selectDetails,
  selectDetailsError,
  selectDetailsLoading,
} from "../../state/courseDetailsSlice";
import { getCourseDetails } from "../requests/requests";

export function useCourseDetails(keyword: string) {
  const dispatch = useDispatch();
  const details = useSelector((s) => selectDetails(s, keyword));
  const loading = useSelector(selectDetailsLoading);
  const error = useSelector(selectDetailsError);

  useEffect(() => {
    let mounted = true;
    if (!keyword) return;
    (async () => {
      try {
        dispatch(detailsLoader(true));
        const data = await getCourseDetails(keyword);
        if (mounted) dispatch(detailsData({ keyword, data }));
      } catch (e: any) {
        if (mounted) dispatch(detailsError(e?.message));
      }
    })();
    return () => {
      mounted = false;
    };
  }, [keyword, dispatch]);

  return { details, loading, error };
}
