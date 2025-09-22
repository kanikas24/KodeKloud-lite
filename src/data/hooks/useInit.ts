import { selectInit, setInit } from "@/src/state/appSlice";
import { useDispatch, useSelector } from "react-redux";

const useInit = () => {
  const initialised = useSelector(selectInit);
  const dispatch = useDispatch();

  const setInitialised = (keyword: boolean) => {
    dispatch(setInit(keyword));
  };

  return { setInitialised, initialised };
};
export default useInit;
