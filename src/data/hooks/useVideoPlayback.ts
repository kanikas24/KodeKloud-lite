import { selectPosition, setPosition } from "@/src/state/videoPlaybackSlice";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const useVideoPlayback = (id: string) => {
  const position = useSelector(selectPosition);
  console.log("position", position);

  const dispatch = useDispatch();

  const videoPosition = useMemo(() => {
    return position[id] ?? 0;
  }, [position, id]);
  const updatePosition = (time: number) => {
    if (time > 0) dispatch(setPosition({ id, seconds: time }));
  };
  return {
    videoPosition,
    updatePosition,
  };
};
export default useVideoPlayback;
